// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

/*
 * El repo se llama franponcio.github.io, así que el sitio vive en la raíz del
 * dominio: base = '/' y no hace falta prefijo en ningún link.
 *
 * El contenido NO está acá adentro: está en ../proyectos (ver content.config.ts).
 */
export default defineConfig({
  site: 'https://franponcio.github.io',
  base: '/',
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] },
});
