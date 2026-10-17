#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Los enlaces del pie a las paginas legales no abrian nada (Adrian, 17-10-2026).

`useEnlacesInternos` se quedaba TODOS los enlaces del mismo dominio: hacia
preventDefault() y navegaba con pushState. Las cuatro paginas legales son HTML
aparte, no rutas de la SPA, asi que `rutaDesdeUrl()` devolvia cadena vacia, la
SPA seguia pintando la portada y lo unico que pasaba era el salto al principio.

Desde aqui el manejador solo intercepta las rutas que la SPA sabe pintar. Las
demas las carga el navegador como un enlace de toda la vida.
"""
import pathlib, re, sys

AQUI = pathlib.Path(__file__).resolve().parent
JS = AQUI / "app.js"
js = JS.read_text(encoding="utf-8")

# ------------------------------------------- 1) la funcion, junto a rutaDesdeUrl
ANCLA = "function irA(url) {"
if ANCLA not in js:
    sys.exit("ABORTA: no encuentro irA()")
if "function laPintaLaSpa" in js:
    sys.exit("ABORTA: ya esta parcheado")

NUEVA = '''// Las unicas rutas que la SPA sabe pintar. Cualquier otra —las cuatro paginas
// legales, que son HTML aparte y no cargan este archivo— la abre el navegador
// como un enlace normal.
function laPintaLaSpa(p) {
  const r = decodeURIComponent(p).replace(/\\/+$/, '');
  return r === '' || r === '/de' ||
         /^(?:\\/de)?\\/work\\/[^/]+$/.test(r) ||
         /^(?:\\/de)?\\/tour$/.test(r);
}

'''
js = js.replace(ANCLA, NUEVA + ANCLA, 1)

# ------------------------------------------------- 2) el corte en el manejador
VIEJO = """      if (url.origin !== location.origin) return;
      e.preventDefault();"""
NUEVO = """      if (url.origin !== location.origin) return;
      // fuera de la SPA (las paginas legales): que navegue el navegador
      if (!laPintaLaSpa(url.pathname)) return;
      e.preventDefault();"""
if js.count(VIEJO) != 1:
    sys.exit("ABORTA: el manejador no es como esperaba (%d coincidencias)" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

JS.write_text(js, encoding="utf-8")
print("app.js reescrito")

# comprobacion a mano de la funcion, con las rutas que importan
import subprocess, json
prueba = """
%s
const casos = {
  "/": true, "/de/": true, "/de": true,
  "/work/graffio-viz": true, "/de/work/islas-360": true,
  "/tour": true, "/de/tour": true,
  "/legal": false, "/privacy": false,
  "/de/impressum": false, "/de/datenschutz": false
};
let mal = 0;
for (const [p, esperado] of Object.entries(casos)) {
  const r = laPintaLaSpa(p);
  if (r !== esperado) { console.log("MAL", p, "->", r, "esperaba", esperado); mal++; }
}
console.log(mal === 0 ? "las 11 rutas, bien" : mal + " fallos");
""" % re.search(r'(function laPintaLaSpa\(p\) \{.*?\n\})', js, re.S).group(1)
(AQUI / "_prueba.js").write_text(prueba, encoding="utf-8")
print(subprocess.run(["node", str(AQUI / "_prueba.js")], capture_output=True, text=True).stdout.strip())
(AQUI / "_prueba.js").unlink()
