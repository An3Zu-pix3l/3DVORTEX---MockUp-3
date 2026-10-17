#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""El modo gafas, listo para probarlo de verdad (Adrian, 17-10-2026).

Adrian va a probar el tour con gafas de carton y un iPhone. Repasando el modo
VR aparecieron cuatro cosas que habrian estropeado la prueba por motivos que no
tienen nada que ver con el tour:

 1) LA PANTALLA SE APAGA. En gafas nadie toca el movil, asi que al minuto o dos
    se bloquea solo y uno se queda a oscuras dentro de las gafas. Se pide un
    wake lock al entrar y se suelta al salir.
 2) LOS ROTULOS ERAN DE 8 PIXELES. En la mano se leen; por unas lentes que
    enfocan al infinito, y con cada ojo ocupando media pantalla, no. Suben a 15.
 3) LOS BOTONES ESTABAN PEGADOS A LOS BORDES (7-10 % del alto), justo donde las
    lentes de carton ya no llegan. Se traen al 22 %.
 4) LA FILA DE ESTANCIAS IBA DE BORDE A BORDE: con las cuatro de Graffio, las de
    los extremos caian fuera del campo visible. Se encierra en el 70 % central.

Y una quinta que solo pasa en iPhone: Safari no deja poner una pagina a pantalla
completa, asi que la barra del navegador se queda y descoloca las dos mitades.
La unica forma de quitarla es abrir la web desde la pantalla de inicio. Ahora,
en iPhone y fuera de la pantalla de inicio, el boton de las gafas lo explica
antes de entrar, con la opcion de entrar igualmente.
"""
import pathlib, re, sys

AQUI = pathlib.Path(__file__).resolve().parent
JS = AQUI / "app.js"
js = JS.read_text(encoding="utf-8")

if "wakeLock" in js:
    sys.exit("ABORTA: ya esta parcheado")

# ============================================================ 1) iOS y standalone
ANCLA = "const MOTION_CAPABLE = typeof window !== 'undefined'"
if ANCLA not in js:
    sys.exit("ABORTA: no encuentro MOTION_CAPABLE")
DETECCION = '''// iPhone y iPad. Importa en el modo gafas: Safari no deja poner una pagina a
// pantalla completa, asi que la barra del navegador se queda ahi y descoloca las
// dos mitades. La unica salida es abrir la web desde la pantalla de inicio, que
// si arranca sin barras.
const ES_IOS = typeof navigator !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const DESDE_INICIO = typeof window !== 'undefined' && (
  window.navigator.standalone === true ||
  (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches));

'''
js = js.replace(ANCLA, DETECCION + ANCLA, 1)

# ====================================================== 2) el wake lock de pantalla
ANCLA = """  // El modo gafas mete su propia entrada en el historial."""
if ANCLA not in js:
    sys.exit("ABORTA: no encuentro el bloque del historial")
WAKE = '''  // ---- Que no se apague la pantalla ---------------------------------------
  // Dentro de las gafas nadie toca el movil: sin esto se bloquea solo a los dos
  // minutos. El permiso se pierde al cambiar de app o atender una llamada, asi
  // que se vuelve a pedir cuando la pagina se ve otra vez.
  const wakeRef = useRef(null);
  useEffect(() => {
    if (!vr) return;
    let vivo = true;
    const pedir = async () => {
      if (!navigator.wakeLock || wakeRef.current || !vivo) return;
      try {
        const w = await navigator.wakeLock.request('screen');
        if (!vivo) { try { w.release(); } catch (e) {} return; }
        wakeRef.current = w;
        w.addEventListener('release', () => { wakeRef.current = null; });
      } catch (e) {}
    };
    pedir();
    const alVolver = () => {
      if (document.visibilityState === 'visible') pedir();
    };
    document.addEventListener('visibilitychange', alVolver);
    return () => {
      vivo = false;
      document.removeEventListener('visibilitychange', alVolver);
      try { wakeRef.current && wakeRef.current.release(); } catch (e) {}
      wakeRef.current = null;
    };
  }, [vr]);

'''
js = js.replace(ANCLA, WAKE + ANCLA, 1)

# ============================================ 3) el aviso de iPhone antes de entrar
VIEJO = """  const enterVr = async () => {
    // El clic es el gesto que iOS exige para pedir permiso del giroscopio,
    // asi que se pide aqui, antes de partir la pantalla.
    if (await askMotion()) setMotion(true);
    setVr(true);
  };"""
NUEVO = """  // En iPhone, fuera de la pantalla de inicio, la barra de Safari se queda ahi
  // y descoloca las dos mitades. Se avisa una vez, con la salida a mano.
  const [avisoIos, setAvisoIos] = useState(false);
  const avisado = useRef(false);
  const pedirVr = async () => {
    if (ES_IOS && !DESDE_INICIO && !avisado.current) {
      avisado.current = true;
      setAvisoIos(true);
      return;
    }
    await enterVr();
  };
  const enterVr = async () => {
    setAvisoIos(false);
    // El clic es el gesto que iOS exige para pedir permiso del giroscopio,
    // asi que se pide aqui, antes de partir la pantalla.
    if (await askMotion()) setMotion(true);
    setVr(true);
  };"""
if js.count(VIEJO) != 1:
    sys.exit("ABORTA [enterVr]: %d coincidencias" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

# el boton llama al aviso, no directamente a entrar
VIEJO = """    className: "close vr-btn",
    onClick: enterVr,"""
NUEVO = """    className: "close vr-btn",
    onClick: pedirVr,"""
if js.count(VIEJO) != 1:
    sys.exit("ABORTA [boton VR]: %d coincidencias" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

# el panel del aviso, junto al resto de lo que se pinta sin gafas
VIEJO = """  }, t("◎ Tap Motion — move your phone to look around"))));
}"""
NUEVO = """  }, t("◎ Tap Motion — move your phone to look around")), avisoIos && /*#__PURE__*/React.createElement("div", {
    className: "ios-vr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ios-vr-caja"
  }, /*#__PURE__*/React.createElement("p", {
    className: "k"
  }, t("Before you put the phone in the glasses")), /*#__PURE__*/React.createElement("p", null, t("On iPhone, Safari keeps its address bar on screen and the two halves end up off-centre. To get rid of it, add this site to your Home Screen and open it from there:")), /*#__PURE__*/React.createElement("p", {
    className: "pasos"
  }, t("Share ↑  ·  Add to Home Screen  ·  open it from the icon")), /*#__PURE__*/React.createElement("div", {
    className: "bts"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    onClick: () => setAvisoIos(false)
  }, t("Not now")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close vr-btn",
    onClick: enterVr
  }, t("Enter anyway →")))))));
}"""
if js.count(VIEJO) != 1:
    sys.exit("ABORTA [panel iOS]: %d coincidencias" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

# ====================================================== 4) el CSS de dentro de las gafas
VIEJO_CSS = """.vr-rooms{position:absolute; left:0; right:0; bottom:10%; z-index:9; display:flex; flex-wrap:wrap;
  justify-content:center; gap:5px; padding:0 6px}
.vr-room-pill{appearance:none; -webkit-appearance:none; cursor:pointer; white-space:nowrap;
  border:1px solid rgba(255,255,255,.35); background:rgba(0,0,0,.55); color:#fff;
  -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);
  font-family:var(--font-mono); font-size:9px; letter-spacing:.12em; text-transform:uppercase;
  padding:7px 10px; border-radius:100px; opacity:.72; transition:opacity .15s, background .15s}"""
NUEVO_CSS = """/* La zona util de unas gafas de carton es un circulo en el centro: lo que queda
   cerca de los bordes no se ve, o se ve curvado. De ahi el 22 % y el 70 % de
   ancho. Y los tamanos de letra son los de leer por una lente, no en la mano. */
.vr-rooms{position:absolute; left:15%; right:15%; bottom:22%; z-index:9; display:flex; flex-wrap:wrap;
  justify-content:center; gap:7px; padding:0}
.vr-room-pill{appearance:none; -webkit-appearance:none; cursor:pointer; white-space:nowrap;
  border:1px solid rgba(255,255,255,.35); background:rgba(0,0,0,.55); color:#fff;
  -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);
  font-family:var(--font-mono); font-size:15px; letter-spacing:.10em; text-transform:uppercase;
  padding:10px 14px; border-radius:100px; opacity:.72; transition:opacity .15s, background .15s}"""
if js.count(VIEJO_CSS) != 1:
    sys.exit("ABORTA [css rooms]: %d coincidencias" % js.count(VIEJO_CSS))
js = js.replace(VIEJO_CSS, NUEVO_CSS, 1)

VIEJO_CSS = """.vr-tip{position:absolute; left:0; right:0; top:calc(50% + 28px); z-index:9; text-align:center;
  color:rgba(255,255,255,.7); font-family:var(--font-mono); font-size:9px; letter-spacing:.14em;
  text-transform:uppercase; pointer-events:none; padding:0 10px; transition:opacity .6s}
.vr-tip.ido{opacity:0}
@media(max-width:560px){ .vr-room-pill{font-size:8px; padding:6px 8px} .vr-rooms{bottom:8%} }"""
NUEVO_CSS = """.vr-tip{position:absolute; left:12%; right:12%; top:calc(50% + 34px); z-index:9; text-align:center;
  color:rgba(255,255,255,.75); font-family:var(--font-mono); font-size:13px; letter-spacing:.12em;
  text-transform:uppercase; pointer-events:none; padding:0; transition:opacity .6s}
.vr-tip.ido{opacity:0}
/* en pantallas estrechas se encoge un punto, no a 8 px: por la lente no se leia */
@media(max-width:560px){ .vr-room-pill{font-size:14px; padding:9px 12px} }"""
if js.count(VIEJO_CSS) != 1:
    sys.exit("ABORTA [css tip]: %d coincidencias" % js.count(VIEJO_CSS))
js = js.replace(VIEJO_CSS, NUEVO_CSS, 1)

# el punto de mira, un poco mayor: por la lente el de 34 px queda fino
js = js.replace(
    ".vr-mira{position:absolute; left:50%; top:50%; width:34px; height:34px; margin:-17px 0 0 -17px;",
    ".vr-mira{position:absolute; left:50%; top:50%; width:40px; height:40px; margin:-20px 0 0 -20px;", 1)

# ============================================================ 5) el aleman de lo nuevo
m = re.search(r'^const DE = \{$', js, re.M)
if not m:
    sys.exit("ABORTA [DE]: no encuentro el bloque")
NUEVAS = '''
  // el aviso de iPhone antes de entrar en las gafas, 17-10-2026
  "Before you put the phone in the glasses": "Bevor Sie das Telefon in die Brille schieben",
  "On iPhone, Safari keeps its address bar on screen and the two halves end up off-centre. To get rid of it, add this site to your Home Screen and open it from there:": "Auf dem iPhone blendet Safari seine Adressleiste nicht aus, und die beiden Hälften sitzen dadurch nicht mittig. Legen Sie die Seite auf den Home-Bildschirm und öffnen Sie sie von dort:",
  "Share ↑  ·  Add to Home Screen  ·  open it from the icon": "Teilen ↑  ·  Zum Home-Bildschirm  ·  über das Symbol öffnen",
  "Not now": "Jetzt nicht",
  "Enter anyway →": "Trotzdem starten →",'''
js = js[:m.end()] + NUEVAS + js[m.end():]

JS.write_text(js, encoding="utf-8")
print("app.js reescrito")

# ================================================= 6) el CSS que vive en las paginas
CAMBIOS_HTML = [
    # el boton de salir: del 9 % al 22 %, y legible por la lente
    (""".vr-exit{position:absolute; top:9%; left:50%; transform:translateX(-50%); z-index:9;
    padding:11px 20px; border-radius:100px; background:rgba(0,0,0,.62);""",
     """.vr-exit{position:absolute; top:22%; left:50%; transform:translateX(-50%); z-index:9;
    padding:12px 22px; border-radius:100px; background:rgba(0,0,0,.62);"""),
    ("""    font-size:11px; letter-spacing:.18em; text-transform:uppercase; cursor:pointer;
    touch-action:manipulation; -webkit-tap-highlight-color:transparent; white-space:nowrap}""",
     """    font-size:14px; letter-spacing:.14em; text-transform:uppercase; cursor:pointer;
    touch-action:manipulation; -webkit-tap-highlight-color:transparent; white-space:nowrap}"""),
    ("""    .vr-exit{top:7%; padding:9px 14px; font-size:10px; letter-spacing:.14em}""",
     """    .vr-exit{top:22%; padding:11px 16px; font-size:13px; letter-spacing:.12em}"""),
    # el aviso de girar el movil tambien se lee por la lente
    ("""      font-size:12px; letter-spacing:.18em; text-transform:uppercase; line-height:2;
      pointer-events:none}""",
     """      font-size:14px; letter-spacing:.14em; text-transform:uppercase; line-height:2;
      pointer-events:none}"""),
]
CSS_IOS = """
  /* El aviso de iPhone antes de entrar en las gafas. */
  .ios-vr{position:absolute; inset:0; z-index:12; display:flex; align-items:center;
    justify-content:center; padding:24px; background:rgba(0,0,0,.72);
    -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px)}
  .ios-vr-caja{max-width:420px; background:#fff; color:var(--ink); border-radius:14px;
    padding:26px 24px; line-height:1.55; font-size:14px}
  .ios-vr-caja .k{font-family:var(--font-mono); font-size:11px; letter-spacing:.18em;
    text-transform:uppercase; color:var(--muted); margin:0 0 14px}
  .ios-vr-caja p{margin:0 0 14px}
  .ios-vr-caja .pasos{font-family:var(--font-mono); font-size:12px; letter-spacing:.06em;
    background:var(--soft,#f3f5f7); border-radius:8px; padding:10px 12px}
  .ios-vr-caja .bts{display:flex; gap:10px; justify-content:flex-end; margin-top:20px}
"""
ANCLA_IOS = "  /* ========== TWEAKS ========== */"
for rel in ("index.html", "_build/index.base.html"):
    f = AQUI / rel
    if not f.exists():
        print("  (no está %s)" % rel); continue
    txt = f.read_text(encoding="utf-8")
    if ".ios-vr" in txt:
        print("  (%s ya está)" % rel); continue
    for viejo, nuevo in CAMBIOS_HTML:
        if txt.count(viejo) != 1:
            sys.exit("ABORTA [%s]: %d coincidencias de %r" % (rel, txt.count(viejo), viejo[:40]))
        txt = txt.replace(viejo, nuevo, 1)
    if txt.count(ANCLA_IOS) != 1:
        sys.exit("ABORTA [%s]: no encuentro donde meter el CSS del aviso" % rel)
    txt = txt.replace(ANCLA_IOS, CSS_IOS + "\n" + ANCLA_IOS, 1)
    # el viewport, para que la pantalla completa llegue al borde en moviles con muesca
    viejo_vp = '<meta name="viewport" content="width=device-width, initial-scale=1" />'
    nuevo_vp = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />'
    if viejo_vp in txt:
        txt = txt.replace(viejo_vp, nuevo_vp, 1)
    # y que al anadir a la pantalla de inicio se abra sin barras
    if "apple-mobile-web-app-capable" not in txt:
        txt = txt.replace(nuevo_vp, nuevo_vp +
            '\n<meta name="apple-mobile-web-app-capable" content="yes" />'
            '\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />', 1)
    f.write_text(txt, encoding="utf-8")
    print("  CSS y metas en %s" % rel)
