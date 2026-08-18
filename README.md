# franponcio.github.io

Portfolio de Francisco Poncio — ingeniería industrial y datos.
Publicado en **https://franponcio.github.io**

## Cómo está organizado

```
franponcio.github.io/
├── franponcio/     El sitio (Astro). Layout, estilos y config.
├── proyectos/      El contenido. Una carpeta por proyecto.
├── testing/        Pruebas y cursos. No se publica.
└── .github/        El workflow que buildea y despliega.
```

La idea: **el sitio y el contenido están separados.** Para agregar un proyecto
no hace falta entrar a `franponcio/` ni saber nada de Astro — se crea una
carpeta en `proyectos/` con un archivo de texto adentro.

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
cd franponcio
npm install
npm run dev      # localhost:4321
npm run build
npm run check    # errores de tipos y de contenido
```

## Deploy

Cada push a `main` dispara `.github/workflows/deploy.yml`: buildea dentro de
`franponcio/` y publica su `dist/`. No hay que tocar nada a mano.
