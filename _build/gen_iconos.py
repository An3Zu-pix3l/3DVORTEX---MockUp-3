#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""El juego de iconos de 3D Vortex.

El original es 02_WEB_mockup-1/favicon.png (512 px), que es el logo bueno: el
remolino que va de azul a amarillo palido.

Por que va sobre un disco azul noche y no suelto, como en el mockup 1: media
espiral es amarillo muy claro, y sobre la barra de pestañas en claro esa mitad
desaparece — a 16 px el logo se ve partido. El disco (--ink del sitio, el mismo
azul de la web) lo deja legible en pestaña clara y en pestaña oscura.

Se probo tambien el trazado vectorial que estaba escondido en el
index-brand.html del mockup 2, pero es de un solo color plano: recoloreado con
un degradado pierde el barrido azul-amarillo del logo de verdad.

Salida en icons/out/:
  favicon.ico           16+32+48 dentro, que es lo que mira el navegador
                        (los PNG sueltos de 16 y 32 se quitaron: no aportaban
                        nada sobre el .ico y al escribirlos en el ordenador se
                        les mete un trozo C2PA de 5,7 KB)
  apple-touch-icon.png  180 px, cuadrado y opaco: el redondeo lo pone iOS
  icon-192/512.png      para la pantalla de inicio en Android
"""
import pathlib

from PIL import Image, ImageDraw

RAIZ = pathlib.Path("/home/claude/seo")
OUT = RAIZ / "icons" / "out"
# El logo original. Se guarda una copia en _build/ para que esto se pueda
# volver a ejecutar sin depender de la carpeta del mockup 1.
ORIGEN = next(p for p in (
    RAIZ / "site" / "_build" / "logo-original.png",
    pathlib.Path("/mnt/user-data/uploads/05_WEB DESIGN/02_WEB_mockup-1/favicon.png"),
) if p.exists())

TINTA = (10, 26, 42, 255)   # #0a1a2a, el --ink del sitio


def logo_cuadrado():
    """El remolino recortado y centrado en un cuadrado.

    El PNG original llega pegado a los bordes por arriba y por abajo; asi
    podemos darle un margen igual por los cuatro lados.
    """
    im = Image.open(ORIGEN).convert("RGBA")
    logo = im.crop(im.getchannel("A").getbbox())
    lado = max(logo.size)
    c = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    c.alpha_composite(logo, ((lado - logo.width) // 2, (lado - logo.height) // 2))
    return c


def disco(logo, px, aire=0.14):
    """Remolino dentro de un disco. Se dibuja a x8 y se reduce: es lo que da
    el borde limpio en vez de un circulo con dientes."""
    S = px * 8
    o = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(o).ellipse([0, 0, S - 1, S - 1], fill=TINTA)
    m = int(S * aire)
    o.alpha_composite(logo.resize((S - 2 * m, S - 2 * m), Image.LANCZOS), (m, m))
    return o.resize((px, px), Image.LANCZOS)


def cuadrado(logo, px, aire=0.18):
    """Para iOS y Android, que recortan ellos: fondo a sangre, sin transparencia."""
    S = px * 4
    o = Image.new("RGBA", (S, S), TINTA)
    m = int(S * aire)
    o.alpha_composite(logo.resize((S - 2 * m, S - 2 * m), Image.LANCZOS), (m, m))
    return o.resize((px, px), Image.LANCZOS)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for viejo in OUT.glob("icon.svg"):
        viejo.unlink()
    logo = logo_cuadrado()

    disco(logo, 48).save(OUT / "favicon.ico", format="ICO",
                         sizes=[(16, 16), (32, 32), (48, 48)])
    disco(logo, 192).save(OUT / "icon-192.png")
    disco(logo, 512).save(OUT / "icon-512.png")
    cuadrado(logo, 180).convert("RGB").save(OUT / "apple-touch-icon.png", quality=95)

    for f in sorted(OUT.iterdir()):
        print(f"  {f.name:24} {f.stat().st_size:>7} B")


if __name__ == "__main__":
    main()
