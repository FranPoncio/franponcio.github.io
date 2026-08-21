---
titulo: Este portfolio
resumen: El sitio que estás leyendo — Astro con el contenido separado del código, para que agregar un proyecto sea crear un archivo de texto.
categoria: herramienta
orden: 8
periodo: '2026'
rol: Diseño y desarrollo
stack: ['Astro', 'TypeScript', 'Tailwind', 'GitHub Actions']
kpis:
  - label: JavaScript
    valor: 0 KB
    nota: 'en las páginas sin componentes'
  - label: Deploy
    valor: ~35 s
    nota: 'de push a publicado'
  - label: Agregar proyecto
    valor: 1 archivo
    nota: 'sin tocar código'
enlace:
  label: Ver el código
  url: https://github.com/FranPoncio/franponcio.github.io
borrador: true
---

> **Texto de relleno.** Esta carpeta se llamaba `web` y no estaba definida — la
> usé para el portfolio mismo. Si `web` era otro proyecto, renombrala.

## El problema

Un portfolio se abandona cuando actualizarlo cuesta. Si agregar un proyecto
implica abrir un editor de código, acordarse de una estructura y pelear con
HTML, la próxima vez que termines algo no lo vas a subir.

## La decisión de fondo

**El contenido no vive adentro del sitio.** El código Astro está en
`franponcio/`, y los proyectos en `proyectos/`, una carpeta más arriba. El
`content.config.ts` apunta afuera:

```ts
loader: glob({ pattern: '**/*.{md,mdx}', base: '../proyectos' })
```

La consecuencia práctica: **para escribir un proyecto no hace falta entrar al
código ni saber Astro.** Se crea una carpeta con un archivo de texto adentro y
el sitio se rearma solo.

## Lo que evita errores

- **El frontmatter está validado.** Si a un proyecto le falta un campo
  obligatorio, el build falla y dice cuál. Es a propósito: mejor que rompa antes
  de publicar que descubrirlo online.
- **Una portada sin `alt` no compila.** El `alt` va adentro del objeto `portada`,
  así el tipo garantiza que no puedan quedar separados.
- **Los borradores se ven.** Con `borrador: true` el proyecto aparece igual,
  pero con etiqueta y una banda de aviso. Es preferible ver el hueco a que algo
  a medio escribir desaparezca sin que te enteres.

## Sobre el rendimiento

Las páginas sin componentes interactivos sirven **cero JavaScript**. Astro sólo
manda JS para las "islas" —un componente React puntual— y el resto es HTML
estático. Las imágenes se convierten a WebP en tres tamaños automáticamente, así
que una foto de obra de 4 MB no se sirve entera en un celular.
