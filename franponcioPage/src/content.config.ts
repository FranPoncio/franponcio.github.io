import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` de 'astro:content' está deprecado en Astro 7; el import correcto es este.
import { z } from 'astro/zod';

/**
 * El sitio es bilingüe. Cada proyecto vive en su carpeta y tiene un archivo
 * por idioma:
 *
 *   proyectos/gasoductos/index.es.md   ← obligatorio
 *   proyectos/gasoductos/index.en.md   ← opcional
 *   proyectos/gasoductos/portada.jpg   ← las imágenes son compartidas
 *
 * Si falta el .en.md, la página en inglés muestra el contenido en español con
 * un aviso. Así se puede traducir de a poco sin romper nada.
 */

const camposProyecto = ({ image }: { image: () => any }) =>
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
    enlace: z.object({ label: z.string(), url: z.url() }).optional(),

    /** El `alt` va dentro del objeto: así el tipo garantiza que no falte. */
    portada: z.object({ src: image(), alt: z.string() }).optional(),
    video: z.url().optional(),
    galeria: z
      .array(z.object({ src: image(), alt: z.string(), pie: z.string().optional() }))
      .default([]),

    borrador: z.boolean().default(false),
  });

/** Saca `/index.es` o `/index.en` del id para que la URL quede limpia. */
const idLimpio = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.(es|en)\.mdx?$/, '').toLowerCase();

const proyectosEs = defineCollection({
  loader: glob({ pattern: '**/index.es.{md,mdx}', base: '../proyectos', generateId: idLimpio }),
  schema: camposProyecto,
});

const proyectosEn = defineCollection({
  loader: glob({ pattern: '**/index.en.{md,mdx}', base: '../proyectos', generateId: idLimpio }),
  schema: camposProyecto,
});

/**
 * FORMACIÓN — una CARPETA por curso, con su certificado adentro:
 *
 *   formacion/ibm-data-science/index.md         ← los datos
 *   formacion/ibm-data-science/certificado.jpg  ← el certificado
 *
 * Así el certificado viaja junto al curso y no queda suelto en otro lado.
 * Astro lo optimiza igual que las fotos de los proyectos.
 *
 * Los nombres de curso no se traducen (son nombres propios), así que hay una
 * sola colección; lo único traducible es la nota.
 */
const formacion = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: '../formacion',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
    titulo: z.string(),
    entidad: z.string(),
    estado: z.enum(['completado', 'cursando', 'planificado']),
    periodo: z.string(),
    orden: z.number().default(99),
    credencial: z.url().optional(),
    nota: z.string().optional(),
    /** Traducción de la nota al inglés. Si falta, se usa la española. */
    notaEn: z.string().optional(),

    /**
     * true = queda en el repo pero no se muestra en el home.
     * Para cursos cortos que, al lado de un certificado de 12 cursos, sólo
     * diluyen. Sacar esta línea alcanza para volver a mostrarlo.
     */
    oculto: z.boolean().default(false),

    /**
     * El certificado, en la misma carpeta del curso: `./certificado.jpg`.
     * Sirve jpg, png, webp y svg. Para un PDF usá `certificadoPdf`.
     */
    certificado: image().optional(),
    /**
     * Certificado en PDF. Va en franponcioPage/public/certificados/ porque los
     * PDF no pasan por el optimizador de imágenes, y acá se pone la ruta:
     * `/certificados/archivo.pdf`.
     */
    certificadoPdf: z.string().optional(),
  }),
});

export const collections = { proyectosEs, proyectosEn, formacion };
