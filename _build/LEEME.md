# Cómo se regenera el sitio

Esta carpeta **no se publica** (está en `.vercelignore`). Contiene la plantilla y
los tres scripts que generan las páginas. Hay que volver a ejecutarlos **cada vez
que cambie el contenido** de `app.js` (proyectos, textos, traducciones).

## Qué hace cada uno

| archivo | qué genera |
|---|---|
| `index.base.html` | La plantilla. **Es el archivo que hay que editar** si se toca la cabecera o el CSS; `index.html` de la raíz es salida, no fuente. |
| `prerender.py` | Las 32 páginas de portada, tour y proyectos, en los dos idiomas. |
| `gen_legal.py` | Las 4 páginas legales (`/legal`, `/privacy`, `/de/impressum`, `/de/datenschutz`). |
| `gen_config.py` | `sitemap.xml`, `vercel.json`, `robots.txt`, `404.html`, `.vercelignore`. |

## El orden importa

```
python3 prerender.py     # primero: borra y rehace work/, tour/, de/work/, de/tour/
python3 gen_legal.py     # después: las legales viven dentro de de/
python3 gen_config.py    # al final: el sitemap cuenta los archivos que existen
```

`prerender.py` necesita el sitio servido en `https://localhost:8443`, porque lee
el título y la descripción **de la propia aplicación** en vez de duplicar esa
lógica. Así no puede haber dos sitios que se contradigan.

## Al lanzar en 3dvortex.ch

En `prerender.py`, poner `PRUEBAS = SITIO` y volver a generar. Eso hace que
`og:url` y las imágenes de vista previa dejen de apuntar al dominio de Vercel.
