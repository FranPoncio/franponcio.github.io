/**
 * Antepone el `base` configurado en astro.config.mjs a una ruta interna.
 *
 * Sin esto, un href fijo como `/proyectos/sgi/` apunta al dominio raíz y se
 * rompe cuando el sitio vive en un subdirectorio (repo `franponcio` →
 * franponcio.github.io/franponcio/). Con esto, cambiar de repo es una línea
 * de config y nada más.
 */
export const conBase = (ruta: string): string =>
  `${import.meta.env.BASE_URL}/${ruta}`.replace(/\/{2,}/g, '/');
