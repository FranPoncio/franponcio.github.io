import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` de 'astro:content' está deprecado en Astro 7; el import correcto es este.
import { z } from 'astro/zod';

/**
 * PROYECTOS — viven en `proyectos/` en la raíz del repo, un nivel más arriba
 * que el sitio. Agregar uno = crear `proyectos/<nombre>/index.md`.
 *
 * Las imágenes van en esa MISMA carpeta, al lado del index.md. Astro las
 * optimiza y les pone hash solo (`image()` en el schema), así que una foto de
 * obra de 4 MB no se sirve tal cual.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: '../proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      /** Una línea. Es lo que se lee en la tarjeta del home. */
      resumen: z.string(),
      categoria: z.enum(['datos', 'gestion', 'herramienta']),
      /** Menor = aparece antes dentro de su categoría. */
      orden: z.number().default(99),
      periodo: z.string(),
      rol: z.string(),
      stack: z.array(z.string()).default([]),
      kpis: z
        .array(z.object({ label: z.string(), valor: z.string(), nota: z.string().optional() }))
        .default([]),
      /** Link externo opcional: app en vivo, repo, PDF. */
      enlace: z.object({ label: z.string(), url: z.string() }).optional(),

      // ── Lo visual ────────────────────────────────────────────────────────
      /**
       * Imagen de portada: encabeza el caso y aparece en la tarjeta del home.
       * `alt` va adentro del objeto a propósito — así el tipo garantiza que una
       * portada nunca puede quedar sin descripción.
       */
      portada: z.object({ src: image(), alt: z.string() }).optional(),
      /** Video de YouTube o Vimeo. Pegá la URL normal; se convierte a embed. */
      video: z.url().optional(),
      /** Galería al pie del caso. */
      galeria: z
        .array(z.object({ src: image(), alt: z.string(), pie: z.string().optional() }))
        .default([]),

      /** true = etiqueta en la tarjeta y banda arriba de la página. */
      borrador: z.boolean().default(false),
    }),
});

/**
 * FORMACIÓN — certificados y cursos. Viven en `formacion/` en la raíz.
 * Un archivo por curso: `formacion/<curso>.md`. No generan página propia,
 * se listan en el home agrupados por estado.
 */
const formacion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../formacion' }),
  schema: z.object({
    titulo: z.string(),
    /** Quién lo dicta: IBM, UTN FRC, Coursera, Google… */
    entidad: z.string(),
    estado: z.enum(['completado', 'cursando', 'planificado']),
    /** Año o rango. En planificados podés poner el año estimado. */
    periodo: z.string(),
    /** Menor = aparece antes dentro de su estado. */
    orden: z.number().default(99),
    /** Link a la credencial verificable, si la tenés. */
    credencial: z.url().optional(),
    /** Una línea sobre qué cubre. Opcional. */
    nota: z.string().optional(),
  }),
});

export const collections = { proyectos, formacion };
