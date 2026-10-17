#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Un servidor SMTP de mentira, para comprobar que api/contact.js habla bien.

Levanta un SMTP sobre TLS con un certificado inventado, apunta la funcion a el
y escribe en pantalla el dialogo entero y el correo que ha recibido, ya
descodificado. No manda nada a ninguna parte.

    python3 api/_prueba_smtp.py
"""
import base64, os, re, socket, ssl, subprocess, sys, tempfile, threading, json

USUARIO = "info@3dvortex.ch"
CLAVE = "la-del-buzon"
PUERTO = 8465
recibido = {}

def certificado(carpeta):
    key, crt = os.path.join(carpeta, "k.pem"), os.path.join(carpeta, "c.pem")
    subprocess.run(["openssl", "req", "-x509", "-newkey", "rsa:2048", "-nodes",
                    "-keyout", key, "-out", crt, "-days", "1",
                    "-subj", "/CN=localhost"], check=True, capture_output=True)
    return key, crt

def servidor(key, crt, listo):
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(crt, key)
    s = socket.socket(); s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(("127.0.0.1", PUERTO)); s.listen(1)
    listo.set()
    con, _ = s.accept()
    con = ctx.wrap_socket(con, server_side=True)
    f = con.makefile("rwb")
    dialogo, datos, en_datos = [], [], False

    def di(txt):
        dialogo.append("  S: " + txt)
        f.write((txt + "\r\n").encode()); f.flush()

    di("220 mentira.hostpoint.ch ESMTP")
    esperando_usuario = esperando_clave = False
    while True:
        linea = f.readline()
        if not linea:
            break
        txt = linea.decode("utf8", "replace").rstrip("\r\n")
        if en_datos:
            if txt == ".":
                en_datos = False
                di("250 2.0.0 Ok: queued")
                continue
            datos.append(txt)
            continue
        dialogo.append("  C: " + (txt if not (esperando_usuario or esperando_clave) else "(base64)"))
        if esperando_usuario:
            recibido["usuario"] = base64.b64decode(txt).decode()
            esperando_usuario = False; esperando_clave = True
            di("334 UGFzc3dvcmQ6"); continue
        if esperando_clave:
            recibido["clave"] = base64.b64decode(txt).decode()
            esperando_clave = False
            di("235 2.7.0 Authentication successful"); continue
        u = txt.upper()
        if u.startswith("EHLO"):
            f.write(b"250-mentira.hostpoint.ch\r\n250 AUTH LOGIN\r\n"); f.flush()
            dialogo.append("  S: 250 AUTH LOGIN")
        elif u.startswith("AUTH LOGIN"):
            esperando_usuario = True; di("334 VXNlcm5hbWU6")
        elif u.startswith("MAIL FROM"):
            recibido["de"] = txt[10:]; di("250 2.1.0 Ok")
        elif u.startswith("RCPT TO"):
            recibido["para"] = txt[8:]; di("250 2.1.5 Ok")
        elif u == "DATA":
            en_datos = True; di("354 End data with <CR><LF>.<CR><LF>")
        elif u == "QUIT":
            di("221 2.0.0 Bye"); break
        else:
            di("250 2.0.0 Ok")
    recibido["correo"] = "\r\n".join(datos)
    recibido["dialogo"] = dialogo
    try: con.close()
    except Exception: pass
    s.close()

def main():
    carpeta = tempfile.mkdtemp()
    key, crt = certificado(carpeta)
    listo = threading.Event()
    h = threading.Thread(target=servidor, args=(key, crt, listo), daemon=True)
    h.start(); listo.wait()

    # el cliente: la funcion de verdad, llamada con un mensaje con acentos
    guion = r"""
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  // solo en la prueba
    const c = require('/home/claude/web/api/contact.js');
    c.envia({ host: '127.0.0.1', port: %d, user: %s, pass: %s, para: 'info@3dvortex.ch' }, {
      name: 'Jörg Müller',
      email: 'joerg@beispiel.ch',
      company: 'Müller Architekten',
      message: 'Grüezi\nWir bräuchten Visualisierungen für ein Mehrfamilienhaus.\n.\nEin Punkt allein in einer Zeile, zum Testen.'
    }).then(() => console.log('enviado')).catch(e => { console.error('FALLO', e.message); process.exit(1); });
    """ % (PUERTO, json.dumps(USUARIO), json.dumps(CLAVE))
    r = subprocess.run(["node", "-e", guion], capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    h.join(timeout=10)

    print("\n--- el dialogo ---")
    for l in recibido.get("dialogo", []):
        print(l)

    print("\n--- lo que ha llegado ---")
    print("  usuario:    ", recibido.get("usuario"))
    print("  contrasena: ", "correcta" if recibido.get("clave") == CLAVE else "MAL")
    print("  remitente:  ", recibido.get("de"))
    print("  destino:    ", recibido.get("para"))

    correo = recibido.get("correo", "")
    cab, _, cuerpo = correo.partition("\r\n\r\n")
    print("\n--- cabeceras ---")
    for l in cab.split("\r\n"):
        print("  " + l)
    print("\n--- cuerpo, descodificado ---")
    try:
        print(base64.b64decode(cuerpo.replace("\r\n", "")).decode("utf8"))
    except Exception as e:
        print("  no se pudo descodificar:", e)

    # comprobaciones
    fallos = []
    if recibido.get("usuario") != USUARIO: fallos.append("usuario")
    if recibido.get("clave") != CLAVE: fallos.append("contrasena")
    if "<info@3dvortex.ch>" not in (recibido.get("de") or ""): fallos.append("remitente")
    if "Reply-To: <joerg@beispiel.ch>" not in cab: fallos.append("reply-to")
    if "=?UTF-8?B?" not in cab: fallos.append("asunto con acentos")
    texto = base64.b64decode(cuerpo.replace("\r\n", "")).decode("utf8")
    if "Grüezi" not in texto: fallos.append("acentos del cuerpo")
    if "Ein Punkt allein" not in texto: fallos.append("linea con un punto solo")
    for l in cab.split("\r\n"):
        if l.lower().startswith("to:") and "," in l: fallos.append("inyeccion en To")
    print("\n" + ("TODO BIEN" if not fallos else "FALLOS: " + ", ".join(fallos)))
    return 1 if fallos else 0

sys.exit(main())
