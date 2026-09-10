#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Puntos 5 y 6: configuracion de Vercel, pagina de error y sitemap de verdad.

  - vercel.json: direcciones limpias (/work/graffio-viz, sin barra final ni
    .html), cabeceras de cache, y el 404.
  - 404.html: una pagina de error con la piel del sitio, no la de Vercel.
  - sitemap.xml: las 32 direcciones reales, con su pareja en el otro idioma.
  - robots.txt: apuntando al sitemap.
  - .vercelignore: que no se suba la carpeta de plantillas.
"""
import json, pathlib, re, sys
from datetime import date

SITE = pathlib.Path("/home/claude/seo/site")
SITIO = "https://3dvortex.ch"


def paginas():
    """Las direcciones reales, sacadas de los archivos que existen."""
    out = []
    for f in sorted(SITE.rglob("index.html")):
        rel = f.relative_to(SITE).parent.as_posix()
        ruta = "/" if rel == "." else "/" + rel
        if "_build" in ruta:
            continue
        out.append(ruta)
    return out


def sitemap(rutas):
    hoy = date.today().isoformat()
    # Las paginas legales no comparten slug entre idiomas.
    LEGALES = {"/legal": "/de/impressum", "/privacy": "/de/datenschutz"}
    LEGALES_INV = {v: k for k, v in LEGALES.items()}

    def pareja(r):
        """La misma pagina en el otro idioma."""
        if r in LEGALES:
            return LEGALES[r]
        if r in LEGALES_INV:
            return LEGALES_INV[r]
        if r == "/":
            return "/de"
        if r in ("/de/", "/de"):
            return "/"
        return r[3:] if r.startswith("/de/") else "/de" + r

    filas = []
    for r in sorted(rutas):
        es_de = r.startswith("/de")
        en = pareja(r) if es_de else r
        de = r if es_de else pareja(r)
        if r in ("/", "/de"):
            prio = "1.0"
        elif r.endswith("/tour"):
            prio = "0.9"
        elif r in LEGALES or r in LEGALES_INV:
            prio = "0.3"
        else:
            prio = "0.8"
        filas.append(
            f"  <url>\n"
            f"    <loc>{SITIO}{r}</loc>\n"
            f"    <lastmod>{hoy}</lastmod>\n"
            f'    <xhtml:link rel="alternate" hreflang="en" href="{SITIO}{en}"/>\n'
            f'    <xhtml:link rel="alternate" hreflang="de-CH" href="{SITIO}{de}"/>\n'
            f'    <xhtml:link rel="alternate" hreflang="x-default" href="{SITIO}{en}"/>\n'
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>{prio}</priority>\n"
            f"  </url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
            '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + "\n".join(filas) + "\n</urlset>\n")


VERCEL = {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "cleanUrls": True,
    "trailingSlash": False,
    "headers": [
        {
            # Las imagenes generadas llevan el ancho en el nombre, asi que una
            # direccion concreta nunca cambia de contenido: se pueden guardar
            # para siempre en la cache del navegador.
            "source": "/assets/r/(.*)",
            "headers": [{"key": "Cache-Control",
                         "value": "public, max-age=31536000, immutable"}],
        },
        {
            "source": "/(fonts|vendor)/(.*)",
            "headers": [{"key": "Cache-Control",
                         "value": "public, max-age=31536000, immutable"}],
        },
        {
            # El HTML si cambia: se revalida siempre.
            "source": "/(.*)",
            "headers": [{"key": "X-Content-Type-Options", "value": "nosniff"},
                        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}],
        },
    ],
    "redirects": [
        # Por si alguien llega con la barra final o con el .html
        {"source": "/work", "destination": "/#portfolio", "permanent": False},
        {"source": "/de/work", "destination": "/de/#portfolio", "permanent": False},
    ],
}


def pagina_404(base):
    """Usa la piel del sitio: misma tipografia y mismos colores."""
    i = base.index("<style")
    j = base.index("</style>") + len("</style>")
    estilos = base[i:j]
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Page not found | 3DVORTEX</title>
<meta name="robots" content="noindex" />
<link rel="stylesheet" href="/fonts/fonts.css"/>
{estilos}
<style>
  .e404{{min-height:100vh; display:grid; place-items:center; text-align:center; padding:40px}}
  .e404 .n{{font-family:var(--font-mono); font-size:11px; letter-spacing:.22em;
           text-transform:uppercase; color:var(--muted); margin-bottom:18px}}
  .e404 h1{{font-family:var(--font-display); font-weight:400; font-style:italic;
           font-size:clamp(38px,6vw,72px); line-height:1; margin:0 0 18px}}
  .e404 p{{color:var(--ink-2); margin:0 0 30px}}
  .e404 a.b{{display:inline-block; padding:14px 24px; border:1px solid var(--ink);
            border-radius:100px; font-family:var(--font-mono); font-size:11px;
            letter-spacing:.22em; text-transform:uppercase; text-decoration:none;
            color:var(--ink); transition:all .3s}}
  .e404 a.b:hover{{background:var(--ink); color:var(--bg)}}
</style>
</head>
<body>
  <div class="e404">
    <div>
      <div class="n">Error 404</div>
      <h1>This page doesn't exist.</h1>
      <p>The link may be old, or the project may have been renamed.</p>
      <a class="b" href="/">Back to the studio →</a>
    </div>
  </div>
</body>
</html>
"""


def main():
    rutas = paginas()
    if len(rutas) < 30:
        print(f"AVISO: solo {len(rutas)} paginas. ¿Se ha ejecutado prerender.py?")
        sys.exit(1)

    (SITE / "sitemap.xml").write_text(sitemap(rutas), encoding="utf-8")
    (SITE / "vercel.json").write_text(json.dumps(VERCEL, indent=2) + "\n", encoding="utf-8")
    (SITE / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n"
        "# La carpeta de plantillas no aporta nada a nadie\nDisallow: /_build/\n\n"
        f"Sitemap: {SITIO}/sitemap.xml\n", encoding="utf-8")
    (SITE / ".vercelignore").write_text("_build/\n", encoding="utf-8")

    base = (SITE / "_build" / "index.base.html").read_text(encoding="utf-8")
    (SITE / "404.html").write_text(pagina_404(base), encoding="utf-8")

    print(f"sitemap.xml   : {len(rutas)} direcciones")
    print(f"vercel.json   : direcciones limpias + cache de imagenes y fuentes")
    print(f"404.html      : con la piel del sitio")
    print(f"robots.txt    : apuntando al sitemap")
    print(f".vercelignore : _build/ fuera del despliegue")


if __name__ == "__main__":
    main()
