#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Enlace entre las fichas de un mismo proyecto (Adrian, 17-10-2026).

Cuatro proyectos estan repartidos en varias fichas, una por servicio, y no se
hablaban entre ellas: quien entraba a las visualizaciones de Islas no se
enteraba de que existe el tour 360, que es el mejor argumento de la web.

    Graffio    viz · print · 360
    Casa Lele  viz · print
    Islas      viz · 360
    Schtubu    tres estancias de IA

Se añaden dos cosas:
  1) arriba, junto a la categoria: una pastilla por cada ficha hermana cuyo
     SERVICIO sea distinto (Islas, Graffio, Casa Lele). Dice el nombre del
     servicio, que es lo que el visitante no sabe que existe.
  2) abajo, antes de anterior/siguiente: la franja «Mas de este proyecto», con
     todas las hermanas y su titulo. Ahi si entran las tres de Schtubu, que
     comparten servicio y se distinguen por la estancia.

Toca app.js (los datos, la ficha y el diccionario) y el CSS de index.html y de
_build/index.base.html. Las 34 paginas se regeneran despues con prerender.py.
"""
import pathlib, re, sys

AQUI = pathlib.Path(__file__).resolve().parent
JS = AQUI / "app.js"
js = JS.read_text(encoding="utf-8")

if "const GRUPOS" in js:
    sys.exit("ABORTA: ya esta parcheado")

# ------------------------------------------------- 1) los grupos y el ayudante
ANCLA = "function buildHomeRows(list) {"
if ANCLA not in js:
    sys.exit("ABORTA: no encuentro buildHomeRows()")

GRUPOS = '''// Fichas que son el mismo proyecto visto por servicios distintos. Una ficha por
// servicio es lo correcto para el portfolio —cada una ensena un trabajo— pero
// sin esto no se hablan entre ellas y el visitante no sabe que existen.
const GRUPOS = {
  "graffio-viz": "graffio", "graffio-print": "graffio", "graffio-360": "graffio",
  "casa-lele-viz": "casa-lele", "casa-lele-print": "casa-lele",
  "islas-viz": "islas", "islas-360": "islas",
  "schtubu-stairwell-ai": "schtubu", "schtubu-living-ai": "schtubu",
  "schtubu-exterior-ai": "schtubu"
};

// Las demas fichas del mismo proyecto, en el orden del portfolio.
function hermanas(slug) {
  const g = GRUPOS[slug];
  if (!g) return [];
  return PROJECTS.filter(p => p.slug !== slug && GRUPOS[p.slug] === g);
}

'''
js = js.replace(ANCLA, GRUPOS + ANCLA, 1)

# ------------------------------------------ 2) las pastillas, junto a la categoria
VIEJO = '''React.createElement("span", null, t(proj.cat)), proj.has360 && /*#__PURE__*/React.createElement("button", {'''
NUEVO = '''React.createElement("span", null, t(proj.cat)), hermanas(slug).filter(h => h.cat !== proj.cat).map(h =>
    /*#__PURE__*/React.createElement("a", {
      key: h.slug,
      className: "pill-otra",
      href: urlProyecto(h.slug)
    }, t(h.cat), " \\u2192")), proj.has360 && /*#__PURE__*/React.createElement("button", {'''
if js.count(VIEJO) != 1:
    sys.exit("ABORTA [pmeta]: %d coincidencias" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

# ------------------------------------- 3) la franja «Mas de este proyecto», en pnav
VIEJO = '''  }, /*#__PURE__*/React.createElement("div", {
    className: "pnav-in"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pn",
    href: urlProyecto(prev.slug)'''
NUEVO = '''  }, hermanas(slug).length ? /*#__PURE__*/React.createElement("div", {
    className: "mas-proyecto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-lbl"
  }, t("More of this project")), /*#__PURE__*/React.createElement("div", {
    className: "mp-list"
  }, hermanas(slug).map(h => /*#__PURE__*/React.createElement("a", {
    key: h.slug,
    className: "mp",
    href: urlProyecto(h.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-cat"
  }, t(h.cat)), /*#__PURE__*/React.createElement("span", {
    className: "mp-t"
  }, t(h.title))))) ) : null, /*#__PURE__*/React.createElement("div", {
    className: "pnav-in"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pn",
    href: urlProyecto(prev.slug)'''
if js.count(VIEJO) != 1:
    sys.exit("ABORTA [pnav]: %d coincidencias" % js.count(VIEJO))
js = js.replace(VIEJO, NUEVO, 1)

# --------------------------------------------------------- 4) el aleman del rotulo
m = re.search(r'^const DE = \{$', js, re.M)
if not m:
    sys.exit("ABORTA [DE]: no encuentro el bloque")
if '"More of this project"' not in js:
    sys.exit("ABORTA: el rotulo no quedo en app.js")
js = js[:m.end()] + '\n  // enlace entre fichas del mismo proyecto, 17-10-2026\n' \
     '  "More of this project": "Mehr zu diesem Projekt",' + js[m.end():]

JS.write_text(js, encoding="utf-8")
print("app.js reescrito")

# ------------------------------------------------------------------- 5) el CSS
CSS = """  .pview .pill-otra{display:inline-flex; align-items:center; gap:8px; padding:9px 16px; border:1px solid var(--line); border-radius:100px; color:var(--muted); font-size:13px; transition:all .3s}
  .pview .pill-otra:hover{border-color:var(--ink); color:var(--ink)}
  .mas-proyecto{border-top:1px solid var(--line); padding-top:26px; margin-bottom:34px}
  .mas-proyecto .mp-lbl{font-family:var(--font-mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:16px}
  .mas-proyecto .mp-list{display:flex; flex-wrap:wrap; gap:14px 40px}
  .mas-proyecto .mp{display:flex; flex-direction:column; gap:4px}
  .mas-proyecto .mp-cat{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted)}
  .mas-proyecto .mp-t{font-family:var(--font-display); font-size:clamp(18px,2vw,24px); line-height:1.1; transition:color .3s}
  .mas-proyecto .mp:hover .mp-t{color:var(--coral); font-style:italic}
  @media(max-width:560px){ .mas-proyecto{padding-top:20px; margin-bottom:26px} .mas-proyecto .mp-list{gap:16px; flex-direction:column} }
"""
ANCLA_CSS = "  .pnav{padding:30px 0 90px}"
for rel in ("index.html", "_build/index.base.html"):
    f = AQUI / rel
    if not f.exists():
        print("  (no está %s)" % rel)
        continue
    txt = f.read_text(encoding="utf-8")
    if ".mas-proyecto" in txt:
        print("  (%s ya tiene el CSS)" % rel)
        continue
    if txt.count(ANCLA_CSS) != 1:
        sys.exit("ABORTA [css %s]: %d coincidencias" % (rel, txt.count(ANCLA_CSS)))
    f.write_text(txt.replace(ANCLA_CSS, CSS + ANCLA_CSS, 1), encoding="utf-8")
    print("  CSS en %s" % rel)
