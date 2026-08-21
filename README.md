# franponcio.github.io

Portfolio de Francisco Poncio — ingeniería industrial y datos.
Publicado en **https://franponcio.github.io**

## Cómo está organizado

```
franponcio.github.io/
├── franponcioPage/     El sitio (Astro). Layout, estilos y config.
├── proyectos/      El contenido. Una carpeta por proyecto.
├── formacion/      Certificados y cursos. Un archivo por curso.
├── testing/        Pruebas y cursos. No se publica.
├── .vscode/        Extensiones y tareas recomendadas.
└── .github/        El workflow que buildea y despliega.
```

> ⚠ **Los ocho proyectos tienen texto de relleno inventado**, puesto para ver la
> estructura completa. Todos están en `borrador: true`, así que muestran una
> banda de aviso. **Reemplazá el texto antes de sacar esa línea.**

La idea: **el sitio y el contenido están separados.** Para agregar un proyecto
no hace falta entrar a `franponcioPage/` ni saber nada de Astro — se crea una
carpeta en `proyectos/` con un archivo de texto adentro.

## Bilingüe

El sitio está en español e inglés. El español vive en la raíz (`/`) y el inglés
bajo `/en/`. El selector del menú es un link a la misma página traducida — sin
JavaScript, e indexable por Google.

Cada proyecto tiene un archivo por idioma dentro de su carpeta:

```
proyectos/gasoductos/
├── index.es.md    ← obligatorio
├── index.en.md    ← opcional
└── portada.jpg    ← las imágenes son compartidas
```

**Si falta el `.en.md`, la página en inglés muestra el español con un aviso.**
Así se traduce de a poco sin que quede ningún hueco ni ningún 404.

Los textos de la interfaz (títulos de sección, botones) están en
`franponcioPage/src/i18n/ui.ts`. Si agregás una clave en `es` y te olvidás en
`en`, TypeScript te lo marca antes de publicar.

## Agregar un proyecto

```bash
mkdir -p proyectos/mi-proyecto
$EDITOR proyectos/mi-proyecto/index.md
```

Con este contenido:

```md
---
titulo: Nombre del proyecto
resumen: Una línea. Es lo que se lee en la tarjeta del home.
categoria: datos # datos | gestion | herramienta
orden: 1 # menor = aparece antes dentro de su categoría
periodo: '2024 — 2025'
rol: Modelo de datos y reporting
stack: ['Power BI', 'DAX']
kpis:
  - label: Red gestionada
    valor: '12.000 km'
    nota: 'gasoductos y ramales'
borrador: true # sacalo cuando esté listo para publicar
---

## El contexto

Markdown normal.
```

Pusheás y listo: el home lo levanta, lo agrupa en su categoría y le arma la
página en `/proyectos/mi-proyecto/`.

**Si te falta un campo obligatorio el build falla y te dice cuál.** Es a
propósito: mejor que rompa antes de publicar que después.

> El nombre de la carpeta se pasa a minúsculas en la URL:
> `proyectos/RutasArgentinas/` → `/proyectos/rutasargentinas/`.

### Imágenes y video

Las imágenes van **en la misma carpeta del proyecto**, al lado del `index.md`.
Astro las optimiza (WebP, varios tamaños, hash) — no se sirven en tamaño
original:

```md
---
portada:
  src: ./portada.jpg
  alt: Traza del gasoducto sobre la ruta provincial   # obligatorio
video: https://www.youtube.com/watch?v=XXXXXXXXXXX     # o Vimeo
galeria:
  - src: ./traza.jpg
    alt: Descripción de la imagen
    pie: Pie de foto opcional
---
```

**Una portada sin `alt` rompe el build a propósito.** Una imagen sin descripción
es invisible para quien usa lector de pantalla, y para Google.

Los PDFs son distintos: van en `franponcioPage/public/proyectos/<nombre>/` porque no
pasan por el optimizador de imágenes.

## Agregar un curso o certificado

Creá `formacion/<curso>.md`. Sólo frontmatter, no necesita cuerpo:

```md
---
titulo: IBM Data Science Professional Certificate
entidad: IBM · Coursera
estado: cursando          # cursando | completado | planificado
periodo: '2025 — 2026'
orden: 1
credencial: https://...   # opcional, link a la credencial verificable
nota: Una línea sobre qué cubre.   # opcional
---
```

Aparece en la banda **Formación** del home, en la columna de su `estado`.

## Los proyectos de hoy

| Carpeta            | Categoría   | Estado    |
| ------------------ | ----------- | --------- |
| `scrum`            | gestión     | borrador  |
| `sgi`              | gestión     | borrador  |
| `pmiproject`       | herramienta | borrador  |
| `RutasArgentinas`  | herramienta | borrador  |
| `bitacora`         | herramienta | borrador  |
| `web`              | herramienta | sin definir |

Todos arrancan con `borrador: true`: aparecen en el home con una etiqueta y una
banda de aviso en su página, hasta que saques esa línea.

## Trabajar en el sitio

```bash
cd franponcioPage
npm install
npm run dev      # localhost:4321
npm run build
npm run check    # errores de tipos y de contenido
```

### Desde VS Code

```bash
git clone https://github.com/FranPoncio/franponcio.github.io
code franponcio.github.io
cd franponcio.github.io/franponcioPage && npm install
```

Al abrirlo, VS Code ofrece instalar las extensiones de `.vscode/extensions.json`
— aceptá. La de **Astro** da resaltado y autocompletado en los `.astro`; la de
**Tailwind** sugiere las clases.

**Para levantar el sitio:** `Ctrl+Shift+P` → *Run Task* → **dev**. Abrí
`localhost:4321` y dejalo abierto: cada vez que guardás un `.md`, el navegador
se actualiza solo.

**Antes de pushear:** *Run Task* → **check**. Te dice si a algún proyecto le
falta un campo obligatorio, que es lo único que puede romper el deploy.

**Para publicar:** pestaña de *Source Control* (`Ctrl+Shift+G`), escribís el
mensaje, **Commit** y **Sync Changes**. En ~35 segundos está online.

El único momento en que hace falta la terminal es el `npm install` inicial.

## Deploy

Cada push a `main` dispara `.github/workflows/deploy.yml`: buildea dentro de
`franponcioPage/` y publica su `dist/`. No hay que tocar nada a mano.
