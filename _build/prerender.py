#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Punto 4: una pagina de verdad por vista, sin cambiar de tecnologia.

Genera un index.html por cada vista — portada, tour y los 14 proyectos, en los
dos idiomas — a partir del index.html base. Cada uno lleva SU titulo, SU
descripcion, SU canonical, SU Open Graph con la portada de ese proyecto, SU
JSON-LD y SU <noscript>. Todos cargan el mismo /app.js, asi que sigue siendo
una sola aplicacion: lo unico que cambia es la cabecera y lo que ve quien no
ejecuta JavaScript.

El titulo y la descripcion NO se reescriben aqui: se leen de la propia
aplicacion, abriendola en cada ruta. Asi no hay dos sitios que puedan
contradecirse.
"""
import asyncio, html, json, pathlib, shutil, sys
from playwright.async_api import async_playwright

EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
LOCAL = "https://localhost:8443"
SITE = pathlib.Path("/home/claude/seo/site")

# --- dominios -------------------------------------------------------------
# canonical y hreflang -> el dominio final, para que la copia de pruebas no
# compita con el sitio real. og:url y las imagenes -> donde vive AHORA, para
# que la vista previa al compartir el enlace funcione.
# AL LANZAR: poner PRUEBAS = SITIO y volver a generar.
SITIO = "https://3dvortex.ch"
PRUEBAS = "https://3-dvortex-mock-up-3-a.vercel.app"

IDIOMAS = [("en", "", "en_US"), ("de", "/de", "de_CH")]


# ---------------------------------------------------------------- extraccion

async def espera_app(pg, seg=20):
    """Espera a que app.js haya definido sus funciones. Se sondea con evaluate
    en vez de wait_for_function, que en este montaje no ve el ambito de la pagina."""
    for _ in range(seg * 5):
        try:
            if await pg.evaluate("() => typeof irA === 'function' && typeof t === 'function'"):
                await pg.wait_for_timeout(400)
                return
        except Exception:
            pass
        await pg.wait_for_timeout(200)
    raise RuntimeError("app.js no ha arrancado")

async def extraer():
    """Lee los datos y los metadatos de la propia aplicacion, ruta por ruta."""
    async with async_playwright() as pw:
        br = await pw.chromium.launch(executable_path=EXE,
            args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        pg = await br.new_page(viewport={"width": 1440, "height": 900}, ignore_https_errors=True)
        await pg.goto(LOCAL + "/", wait_until="networkidle", timeout=120000)
        await pg.wait_for_timeout(1200)

        datos = await pg.evaluate("""() => ({
          proyectos: PROJECTS.map(p => ({
            slug: p.slug, title: p.title, place: p.place || '', cat: p.cat,
            pending: !!p.pending, cover: p.cover.img,
            imagenes: p.rows.flatMap(r => r.items.map(i => ({ img: i.img, c: i.c || '' })))
          })),
          servicios: SERVICES.map(s => ({ t: s.t, d: s.d })),
          panoramas: PANORAMAS.map(s => ({ t: s.t, c: s.c, place: s.place }))
        })""")

        rutas = [("home", "/"), ("tour", "/tour")] + \
                [("proyecto", "/work/" + p["slug"]) for p in datos["proyectos"]]

        metadatos = {}
        for lang, pref, _ in IDIOMAS:
            # OJO: para extraer NO se navega a /de/... — todavia no existe, es lo
            # que estamos generando. Se abre la portada con ?lang=de y se recorren
            # las rutas sin prefijo; el idioma ya esta puesto en la aplicacion.
            await pg.goto(LOCAL + "/" + ("?lang=de" if lang == "de" else ""),
                          wait_until="networkidle", timeout=120000)
            await espera_app(pg)
            for tipo, ruta in rutas:
                await pg.evaluate("u => irA(u)", ruta)
                await pg.wait_for_timeout(450)
                metadatos[(lang, ruta)] = {
                    "title": await pg.title(),
                    "desc": await pg.evaluate(
                        "() => document.querySelector('meta[name=description]').content"),
                }
        # los textos de interfaz que hacen falta en el <noscript> aleman
        etiquetas = {}
        for lang, pref, _ in IDIOMAS:
            await pg.goto(LOCAL + "/" + ("?lang=de" if lang == "de" else ""),
                          wait_until="networkidle", timeout=120000)
            await espera_app(pg)
            etiquetas[lang] = await pg.evaluate("""() => ({
              servicios: t('Services'), proyectos: t('Selected projects'),
              estudio: t('Studio'), tour: t('360° Virtual Tour'),
              volver: t('All projects'), necesita: t('This site needs JavaScript for the interactive gallery and the 360° tour.'),
              cats: Object.fromEntries([...new Set(PROJECTS.map(p=>p.cat))].map(c=>[c, t(c)]))
            })""")
        await br.close()
    return datos, metadatos, etiquetas


# ---------------------------------------------------------------- plantilla

def trozos(base):
    """Localiza las tres zonas del index.html que cambian en cada pagina."""
    i = base.index("<title>")
    j = base.index('<meta name="theme-color"')
    cabecera = base[i:j]
    a = base.index('<script type="application/ld+json">')
    b = base.index("</script>", a) + len("</script>")
    jsonld = base[a:b]
    n1 = base.index("<noscript>")
    n2 = base.index("</noscript>") + len("</noscript>")
    noscript = base[n1:n2]
    return cabecera, jsonld, noscript


def e(s):
    return html.escape(str(s), quote=True)


def cabecera_de(pagina):
    """Titulo, descripcion, canonical, hreflang, Open Graph y Twitter."""
    p = pagina
    alt = "".join(
        f'<link rel="alternate" hreflang="{hl}" href="{SITIO}{u}" />\n'
        for hl, u in p["alternativas"])
    return f"""<title>{e(p['title'])}</title>
<meta name="description" content="{e(p['desc'])}" />

<!-- canonical y hreflang apuntan al dominio final; og:url y las imagenes, a
     donde vive ahora, para que la vista previa al compartir funcione ya.
     AL LANZAR EN 3dvortex.ch: poner PRUEBAS = SITIO en prerender.py. -->
<link rel="canonical" href="{SITIO}{p['ruta']}" />
{alt}<link rel="alternate" hreflang="x-default" href="{SITIO}{p['xdefault']}" />

<!-- Open Graph -->
<meta property="og:type"           content="{p['ogtype']}" />
<meta property="og:site_name"      content="3D Vortex" />
<meta property="og:locale"         content="{p['locale']}" />
<meta property="og:url"            content="{PRUEBAS}{p['ruta']}" />
<meta property="og:title"          content="{e(p['title'])}" />
<meta property="og:description"    content="{e(p['desc'])}" />
<meta property="og:image"          content="{PRUEBAS}{p['imagen']}" />
<meta property="og:image:alt"      content="{e(p['imagen_alt'])}" />

<!-- Twitter / X -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="{e(p['title'])}" />
<meta name="twitter:description" content="{e(p['desc'])}" />
<meta name="twitter:image"       content="{PRUEBAS}{p['imagen']}" />

"""


ESTUDIO = {
    "@type": "PostalAddress", "streetAddress": "Aemtlerstrasse 78",
    "postalCode": "8003", "addressLocality": "Zürich", "addressCountry": "CH",
}


def jsonld_proyecto(p, pagina):
    d = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": p["title"],
        "url": SITIO + pagina["ruta"],
        "headline": pagina["title"],
        "description": pagina["desc"],
        "image": [PRUEBAS + i["img"] for i in p["imagenes"][:6]],
        "creator": {
            "@type": "ProfessionalService", "name": "3D Vortex",
            "url": SITIO + "/", "address": ESTUDIO,
        },
        "genre": p["cat"],
        "inLanguage": pagina["lang"],
    }
    if p["place"]:
        d["contentLocation"] = {"@type": "Place", "name": p["place"]}
    miga = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "3D Vortex",
             "item": SITIO + pagina["prefijo"] + "/"},
            {"@type": "ListItem", "position": 2, "name": p["title"]},
        ],
    }
    return ('<script type="application/ld+json">\n'
            + json.dumps(d, ensure_ascii=False, indent=2)
            + '\n</script>\n<script type="application/ld+json">\n'
            + json.dumps(miga, ensure_ascii=False, indent=2) + '\n</script>')


def noscript_proyecto(p, pagina, et):
    cat = et["cats"].get(p["cat"], p["cat"])
    lugar = f", {e(p['place'])}" if p["place"] else ""
    imgs = "".join(
        f'      <li>{e(i["c"])}</li>\n' for i in p["imagenes"] if i.get("c"))
    return f"""<noscript>
    <div style="max-width:760px;margin:0 auto;padding:48px 24px;font-family:system-ui,sans-serif;line-height:1.6;color:#0a1a2a">
    <p><a href="{pagina['prefijo']}/">3D Vortex</a> &rsaquo; {e(cat)}</p>
    <h1>{e(p['title'])}{lugar}</h1>
    <p>{e(pagina['desc'])}</p>
{('    <h2>' + e(pagina['title'].split(' | ')[0]) + '</h2>' + chr(10) + '    <ul>' + chr(10) + imgs + '    </ul>' + chr(10)) if imgs else ''}
    <h2>{e(et['estudio'])}</h2>
    <p>3D Vortex<br />Aemtlerstrasse 78, 8003 Z&uuml;rich, Switzerland<br />
    <a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a> &middot;
    <a href="tel:+41442031330">+41 44 203 13 30</a></p>
    <p><em>{e(et['necesita'])}</em></p>
    </div>
  </noscript>"""


def noscript_tour(datos, pagina, et):
    salas = "".join(
        f'      <li>{e(s["t"])} — {e(s["c"])}, {e(s["place"])}</li>\n'
        for s in datos["panoramas"])
    return f"""<noscript>
    <div style="max-width:760px;margin:0 auto;padding:48px 24px;font-family:system-ui,sans-serif;line-height:1.6;color:#0a1a2a">
    <p><a href="{pagina['prefijo']}/">3D Vortex</a></p>
    <h1>{e(pagina['title'].split(' | ')[0])}</h1>
    <p>{e(pagina['desc'])}</p>
    <h2>{e(et['tour'])}</h2>
    <ul>
{salas}    </ul>
    <h2>{e(et['estudio'])}</h2>
    <p>3D Vortex<br />Aemtlerstrasse 78, 8003 Z&uuml;rich, Switzerland<br />
    <a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a> &middot;
    <a href="tel:+41442031330">+41 44 203 13 30</a></p>
    <p><em>{e(et['necesita'])}</em></p>
    </div>
  </noscript>"""


def noscript_home(datos, pagina, et):
    servicios = "".join(
        f'      <li><strong>{e(s["t"])}</strong> — {e(s["d"])}</li>\n'
        for s in datos["servicios"])
    proyectos = "".join(
        '      <li><a href="{}{}/work/{}">{}{} — {}</a></li>\n'.format(
            "", pagina["prefijo"], p["slug"], e(p["title"]),
            (", " + e(p["place"])) if p["place"] else "",
            e(et["cats"].get(p["cat"], p["cat"])))
        for p in datos["proyectos"])
    return f"""<noscript>
    <div style="max-width:760px;margin:0 auto;padding:48px 24px;font-family:system-ui,sans-serif;line-height:1.6;color:#0a1a2a">
    <h1>{e(pagina['title'].split(' | ')[0])}</h1>
    <p>{e(pagina['desc'])}</p>

    <h2>{e(et['servicios'])}</h2>
    <ul>
{servicios}    </ul>

    <h2>{e(et['proyectos'])}</h2>
    <ul>
{proyectos}    </ul>

    <h2>{e(et['estudio'])}</h2>
    <p>3D Vortex<br />Aemtlerstrasse 78, 8003 Z&uuml;rich, Switzerland<br />
    <a href="mailto:info@3dvortex.ch">info@3dvortex.ch</a> &middot;
    <a href="tel:+41442031330">+41 44 203 13 30</a></p>
    <p><em>{e(et['necesita'])}</em></p>
    </div>
  </noscript>"""


# ---------------------------------------------------------------- generacion

def main():
    # La plantilla vive aparte: si leyeramos site/index.html estariamos leyendo
    # la salida de la pasada anterior, y esto tiene que poder ejecutarse cada vez
    # que se publique. _build queda fuera del despliegue via .vercelignore.
    plantilla = SITE / "_build" / "index.base.html"
    if not plantilla.exists():
        plantilla.parent.mkdir(parents=True, exist_ok=True)
        plantilla.write_text((SITE / "index.html").read_text(encoding="utf-8"), encoding="utf-8")
    base = plantilla.read_text(encoding="utf-8")
    cab_v, json_v, nos_v = trozos(base)

    datos, metadatos, etiquetas = asyncio.run(extraer())
    proyectos = {p["slug"]: p for p in datos["proyectos"]}

    # Limpiar SOLO lo que genera este script. Antes borraba de/ entera y se
    # llevaba por delante /de/impressum y /de/datenschutz, que las genera otro.
    for d in ("work", "tour", "de/work", "de/tour"):
        shutil.rmtree(SITE / d, ignore_errors=True)

    escritas = []
    for lang, pref, locale in IDIOMAS:
        et = etiquetas[lang]
        rutas = [("home", "/"), ("tour", "/tour")] + \
                [("proyecto", "/work/" + s) for s in proyectos]
        for tipo, ruta in rutas:
            meta = metadatos[(lang, ruta)]
            pagina = {
                "lang": lang, "prefijo": pref, "locale": locale,
                # Sin barra final en ningun sitio salvo la raiz, para que
                # coincida con `trailingSlash: false` de vercel.json.
                "ruta": (pref + ruta) if ruta != "/" else (pref or "/"),
                "title": meta["title"], "desc": meta["desc"],
                "xdefault": "/" if ruta == "/" else ruta,
                "alternativas": [("en", "/" if ruta == "/" else ruta),
                                 ("de-CH", "/de" if ruta == "/" else "/de" + ruta)],
                "ogtype": "website" if tipo == "home" else "article",
            }
            if tipo == "proyecto":
                p = proyectos[ruta.rsplit("/", 1)[1]]
                pagina["imagen"] = p["cover"]
                pagina["imagen_alt"] = f"{p['title']} — {p['cat']} by 3D Vortex"
                nuevo_json = jsonld_proyecto(p, pagina)
                nuevo_nos = noscript_proyecto(p, pagina, et)
            else:
                pagina["imagen"] = "/assets/og-cover.jpg"
                pagina["imagen_alt"] = "Kindergarten Kreuzgut, competition visualization by 3D Vortex"
                nuevo_json = json_v          # la ficha del estudio, tal cual
                nuevo_nos = (noscript_home(datos, pagina, et) if tipo == "home"
                             else noscript_tour(datos, pagina, et))

            doc = base.replace(cab_v, cabecera_de(pagina), 1)
            doc = doc.replace(json_v, nuevo_json, 1)
            doc = doc.replace(nos_v, nuevo_nos, 1)
            doc = doc.replace('<html lang="en">', f'<html lang="{lang}">', 1)

            destino = SITE / (pagina["ruta"].strip("/") or ".") / "index.html"
            destino.parent.mkdir(parents=True, exist_ok=True)
            destino.write_text(doc, encoding="utf-8")
            escritas.append(str(destino.relative_to(SITE)))

    print(f"{len(escritas)} paginas generadas:")
    for f in escritas:
        print("  ", f)
    return escritas


if __name__ == "__main__":
    main()
