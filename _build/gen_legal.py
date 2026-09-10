#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Punto 13: paginas de aviso legal y privacidad de verdad.

Hasta ahora eran dos rotulos en el pie que no llevaban a ninguna parte — igual
que en la web actual. Aqui se generan como paginas reales, en los dos idiomas.

Lo que dice la politica de privacidad esta COMPROBADO sobre el codigo, no
copiado de una plantilla: este sitio no pone cookies, no carga nada de terceros
(ni las tipografias), no tiene analitica, y lo unico que guarda en el navegador
es el idioma elegido. Los huecos entre corchetes son los datos que solo puede
poner Adrian.
"""
import pathlib, sys

SITE = pathlib.Path("/home/claude/seo/site")

TEXTOS = {
    "en": {
        "legal_slug": "legal",
        "priv_slug": "privacy",
        "legal_title": "Legal notice",
        "priv_title": "Privacy policy",
        "volver": "Back to the studio →",
        "legal": """
<h2>Company</h2>
<p><strong>3D Vortex KlG</strong><br />
Aemtlerstrasse 78<br />
8003 Zürich<br />
Switzerland</p>

<h2>Contact</h2>
<p><a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a><br />
<a href="tel:+41442031330">+41 44 203 13 30</a></p>

<h2>Commercial register</h2>
<p>Business identification number: <mark>[CHE-___.___.___ — to be completed]</mark><br />
Legal form: <mark>[Kollektivgesellschaft / to be confirmed]</mark><br />
Persons responsible for content: <mark>[names — to be completed]</mark></p>

<h2>Images and content</h2>
<p>All visualizations, 3D models, photographs and texts on this site are the work
of 3D Vortex or of the architecture practices that commissioned them, and are
published with their consent. They may not be reproduced without written
permission.</p>

<h2>Liability</h2>
<p>The visualizations shown are design representations, not construction
documents or as-built records. 3D Vortex accepts no liability for decisions taken
on the basis of images published on this site.</p>
""",
        "priv": """
<p class="lede">The short version: this site does not track you. What follows is
the detail, and it describes what the site actually does — it was written by
reading the code, not copied from a template.</p>

<h2>What this site does not do</h2>
<ul>
  <li>It sets <strong>no cookies</strong>. None at all.</li>
  <li>It has <strong>no analytics</strong> and no advertising or tracking pixels.</li>
  <li>It loads <strong>nothing from third parties</strong> — the typefaces, the
  scripts and the 360° viewer are all served from this domain, so no external
  company receives your IP address by the mere act of opening the page.</li>
</ul>

<h2>What is stored in your browser</h2>
<p>One single value: the language you chose (English or German), kept so the site
opens in the same language next time. It stays in your browser, is never sent
anywhere, and clearing your browser data removes it.</p>

<h2>The contact form</h2>
<p>If you write to us through the form, the name, email address, company and
message you type are sent to us so we can reply. We use them for that and nothing
else: no newsletter, no sharing, no selling. They are handled by
<mark>[form provider — to be completed]</mark> and reach us by email at
info@3dvortex.ch.</p>
<p>You can write to <a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a> at any
time to ask what we hold about you, or to have it deleted.</p>

<h2>Server logs</h2>
<p>This site is hosted by <mark>[Vercel Inc. — confirm at launch]</mark>, which
keeps standard access logs (IP address, time, page requested) for security and
troubleshooting. We do not use them to build profiles.</p>

<h2>Responsible</h2>
<p>3D Vortex KlG, Aemtlerstrasse 78, 8003 Zürich, Switzerland ·
<a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a></p>

<p class="nota">This notice is a working draft prepared from the site's actual
behaviour. Before the site goes live it should be checked against the Swiss
Federal Act on Data Protection (nFADP) by someone qualified to do so, and the
bracketed fields completed.</p>
""",
    },
    "de": {
        "legal_slug": "impressum",
        "priv_slug": "datenschutz",
        "legal_title": "Impressum",
        "priv_title": "Datenschutzerklärung",
        "volver": "Zurück zum Studio →",
        "legal": """
<h2>Unternehmen</h2>
<p><strong>3D Vortex KlG</strong><br />
Aemtlerstrasse 78<br />
8003 Zürich<br />
Schweiz</p>

<h2>Kontakt</h2>
<p><a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a><br />
<a href="tel:+41442031330">+41 44 203 13 30</a></p>

<h2>Handelsregister</h2>
<p>Unternehmens-Identifikationsnummer: <mark>[CHE-___.___.___ — nachzutragen]</mark><br />
Rechtsform: <mark>[Kollektivgesellschaft / zu bestätigen]</mark><br />
Inhaltlich verantwortlich: <mark>[Namen — nachzutragen]</mark></p>

<h2>Bilder und Inhalte</h2>
<p>Sämtliche Visualisierungen, 3D-Modelle, Fotografien und Texte auf dieser Seite
stammen von 3D Vortex oder von den beauftragenden Architekturbüros und werden mit
deren Einverständnis veröffentlicht. Eine Vervielfältigung ohne schriftliche
Genehmigung ist nicht gestattet.</p>

<h2>Haftung</h2>
<p>Die gezeigten Visualisierungen sind Entwurfsdarstellungen, keine Ausführungs-
oder Bestandsunterlagen. 3D Vortex übernimmt keine Haftung für Entscheidungen,
die auf Grundlage der hier veröffentlichten Bilder getroffen werden.</p>
""",
        "priv": """
<p class="lede">Kurz gesagt: Diese Seite verfolgt Sie nicht. Was folgt, ist die
ausführliche Fassung — und sie beschreibt, was die Seite tatsächlich tut. Sie
wurde anhand des Codes geschrieben, nicht aus einer Vorlage übernommen.</p>

<h2>Was diese Seite nicht tut</h2>
<ul>
  <li>Sie setzt <strong>keine Cookies</strong>. Gar keine.</li>
  <li>Sie hat <strong>keine Analyse-Werkzeuge</strong> und keine Werbe- oder
  Tracking-Pixel.</li>
  <li>Sie lädt <strong>nichts von Dritten</strong> — Schriften, Skripte und der
  360°-Betrachter kommen alle von dieser Domain. Kein fremdes Unternehmen erhält
  Ihre IP-Adresse allein dadurch, dass Sie die Seite öffnen.</li>
</ul>

<h2>Was im Browser gespeichert wird</h2>
<p>Ein einziger Wert: die von Ihnen gewählte Sprache (Deutsch oder Englisch),
damit die Seite beim nächsten Mal in derselben Sprache öffnet. Er bleibt in Ihrem
Browser, wird nirgendwohin gesendet, und das Löschen der Browserdaten entfernt ihn.</p>

<h2>Das Kontaktformular</h2>
<p>Wenn Sie uns über das Formular schreiben, werden Name, E-Mail-Adresse, Büro und
Nachricht an uns übermittelt, damit wir antworten können. Wir verwenden sie dafür
und für nichts anderes: kein Newsletter, keine Weitergabe, kein Verkauf. Die
Zustellung erfolgt über <mark>[Formular-Anbieter — nachzutragen]</mark> und
erreicht uns per E-Mail an info@3dvortex.ch.</p>
<p>Sie können jederzeit an <a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a>
schreiben, um Auskunft oder Löschung zu verlangen.</p>

<h2>Server-Protokolle</h2>
<p>Diese Seite wird bei <mark>[Vercel Inc. — vor dem Start bestätigen]</mark>
gehostet. Dort fallen übliche Zugriffsprotokolle an (IP-Adresse, Zeitpunkt,
aufgerufene Seite), zur Sicherheit und Fehlersuche. Wir erstellen daraus keine
Profile.</p>

<h2>Verantwortlich</h2>
<p>3D Vortex KlG, Aemtlerstrasse 78, 8003 Zürich, Schweiz ·
<a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a></p>

<p class="nota">Dieser Text ist ein Arbeitsentwurf, erstellt anhand des
tatsächlichen Verhaltens der Seite. Vor dem Livegang sollte er von fachkundiger
Seite gegen das revidierte Datenschutzgesetz (revDSG) geprüft und die Felder in
Klammern ergänzt werden.</p>
""",
    },
}

PLANTILLA = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{titulo} | 3DVORTEX</title>
<meta name="description" content="{desc}" />
<link rel="canonical" href="https://3dvortex.ch{ruta}" />
<link rel="alternate" hreflang="en" href="https://3dvortex.ch{alt_en}" />
<link rel="alternate" hreflang="de-CH" href="https://3dvortex.ch{alt_de}" />
<meta name="robots" content="index,follow" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="stylesheet" href="/fonts/fonts.css"/>
{estilos}
<style>
  .doc{{max-width:720px; margin:0 auto; padding:96px 24px 120px}}
  .doc .vuelta{{font-family:var(--font-mono); font-size:11px; letter-spacing:.2em;
       text-transform:uppercase; color:var(--muted); text-decoration:none}}
  .doc .vuelta:hover{{color:var(--ink)}}
  .doc h1{{font-family:var(--font-display); font-weight:400; font-size:clamp(36px,5vw,64px);
       line-height:1.02; letter-spacing:-.02em; margin:26px 0 34px}}
  .doc h2{{font-family:var(--font-mono); font-size:11px; letter-spacing:.2em;
       text-transform:uppercase; color:var(--muted); font-weight:500; margin:40px 0 12px}}
  .doc p, .doc li{{font-size:15.5px; line-height:1.7; color:var(--ink-2)}}
  .doc ul{{padding-left:20px}}
  .doc li{{margin-bottom:8px}}
  .doc a{{color:var(--ink)}}
  .doc .lede{{font-size:18px; color:var(--ink); border-left:2px solid var(--line);
       padding-left:18px; margin-bottom:36px}}
  .doc mark{{background:#fdf1c7; color:var(--ink); padding:1px 5px; border-radius:3px}}
  .doc .nota{{margin-top:44px; padding-top:22px; border-top:1px solid var(--line);
       font-size:13.5px; color:var(--muted); font-style:italic}}
</style>
</head>
<body>
  <main class="doc">
    <a class="vuelta" href="{inicio}">{volver}</a>
    <h1>{titulo}</h1>
{cuerpo}
  </main>
</body>
</html>
"""


def main():
    base = SITE / "_build" / "index.base.html"
    if not base.exists():
        print("falta la plantilla _build/index.base.html")
        sys.exit(1)
    s = base.read_text(encoding="utf-8")
    estilos = s[s.index("<style"):s.index("</style>") + len("</style>")]

    escritas = []
    for lang, txt in TEXTOS.items():
        pref = "" if lang == "en" else "/de"
        otro = "de" if lang == "en" else "en"
        for clase in ("legal", "priv"):
            slug = txt[f"{clase}_slug"]
            slug_otro = TEXTOS[otro][f"{clase}_slug"]
            ruta = f"{pref}/{slug}"
            doc = PLANTILLA.format(
                lang=lang,
                titulo=txt[f"{clase}_title"],
                desc=("Legal notice and company details of 3D Vortex, architectural "
                      "visualization studio in Zürich." if clase == "legal" and lang == "en" else
                      "How this site handles your data: no cookies, no analytics, nothing from "
                      "third parties." if lang == "en" else
                      "Impressum und Angaben zum Unternehmen 3D Vortex, Studio für "
                      "Architekturvisualisierung in Zürich." if clase == "legal" else
                      "Wie diese Seite mit Ihren Daten umgeht: keine Cookies, keine Analyse, "
                      "nichts von Dritten."),
                ruta=ruta,
                alt_en=f"/{slug}" if lang == "en" else f"/{slug_otro}",
                alt_de=f"/de/{slug_otro}" if lang == "en" else f"/de/{slug}",
                estilos=estilos,
                inicio=pref + "/" if pref else "/",
                volver=txt["volver"],
                cuerpo=txt[clase],
            )
            destino = SITE / ruta.strip("/") / "index.html"
            destino.parent.mkdir(parents=True, exist_ok=True)
            destino.write_text(doc, encoding="utf-8")
            escritas.append(ruta)

    print("paginas legales generadas:")
    for r in escritas:
        print("  ", r)
    print("\nOJO: los campos entre corchetes y resaltados en amarillo son los que")
    print("faltan (numero CHE, responsables, proveedor del formulario).")


if __name__ == "__main__":
    main()
