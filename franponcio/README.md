# franponcio/ — el sitio

Sitio estático con [Astro](https://astro.build). **Acá está el layout, no el
contenido**: los proyectos viven en `../proyectos/`.

## Estructura

```
franponcio/
├── src/
│   ├── content.config.ts   El contrato del frontmatter (apunta a ../proyectos)
│   ├── pages/
│   │   ├── index.astro     El panel de control
│   │   └── proyectos/[...id].astro   UNA página que sirve a TODOS los casos
│   ├── layouts/Base.astro
│   ├── components/         Tarjeta de proyecto y grilla de KPIs
│   ├── lib/url.ts          Helper de rutas (respeta el `base`)
│   └── styles/global.css   Tokens de color y tipografía
└── public/                 Favicon y assets globales
```

La pieza que hace que esto escale es `[...id].astro`: **una sola página** que
genera todas las de proyectos. Agregar un caso nunca requiere tocar layout.

## De dónde sale el contenido

`src/content.config.ts` apunta a `../proyectos`, fuera de este directorio:

```ts
loader: glob({ pattern: '**/*.{md,mdx}', base: '../proyectos' })
```

Es a propósito: para escribir un proyecto no hace falta entrar acá.

## Imágenes y PDFs de un proyecto

Poné los archivos en `public/proyectos/<nombre>/` y referencialos desde el
Markdown con ruta absoluta:

```md
![Curva S](/proyectos/evm/curva-s.png)
```

## Componentes interactivos

Si un caso necesita algo que ande, renombrá su `index.md` a `index.mdx` e
importá un componente React desde `src/components/`. Astro manda JavaScript
**sólo** para ese componente; hoy ninguna página sirve JS.

## Comandos

```bash
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run preview  # sirve dist/
npm run check    # tipos y contenido
```

## Pendiente: las tipografías

`Base.astro` carga **Archivo** e **IBM Plex Mono** desde Google Fonts, o sea que
depende de un CDN externo — al revés de Rutas Argentinas, donde las
vendorizaste. Para cambiarlo: bajá los `.woff2` a `public/fonts/`, declaralos
con `@font-face` en `src/styles/global.css` y sacá los `<link>` del layout.
