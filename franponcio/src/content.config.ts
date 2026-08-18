import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` de 'astro:content' está deprecado en Astro 7; el import correcto es este.
import { z } from 'astro/zod';

/**
 * Los proyectos NO viven dentro del sitio: viven en `proyectos/` en la raíz del
 * repositorio, un nivel más arriba. El `base` de abajo es lo que lo permite.
 *
 * Agregar un proyecto = crear `proyectos/<nombre>/index.md`. Nada más.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: '../proyectos' }),
  schema: z.object({
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
    /** true = etiqueta en la tarjeta y banda arriba de la página. */
    borrador: z.boolean().default(false),
  }),
});

export const collections = { proyectos };
