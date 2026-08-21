import * as si from 'simple-icons';

/**
 * Logo de marca para usar de marca de agua en la tarjeta de un proyecto.
 *
 * Los SVG vienen del paquete `simple-icons`, que viaja en el repo: no se baja
 * nada de ningún CDN y el path se incrusta en el HTML durante el build.
 *
 * OJO: Power BI y Tableau NO están en simple-icons — Microsoft y Salesforce
 * pidieron que los saquen. Para esos no hay logo y la tarjeta cae al nombre
 * escrito, que es lo correcto: dibujar una aproximación de una marca ajena es
 * peor que no ponerla.
 */

const MAPA: Record<string, string> = {
  react: 'siReact',
  typescript: 'siTypescript',
  javascript: 'siJavascript',
  tailwind: 'siTailwindcss',
  astro: 'siAstro',
  'github actions': 'siGithubactions',
  leaflet: 'siLeaflet',
  vitest: 'siVitest',
  pwa: 'siPwa',
  sap: 'siSap',
  'c++': 'siCplusplus',
  python: 'siPython',
  qgis: 'siQgis',
  figma: 'siFigma',
  trello: 'siTrello',
  jira: 'siJira',
};

export interface Logo {
  /** El `d` del path, listo para meter en un <svg viewBox="0 0 24 24">. */
  path: string;
  titulo: string;
}

/** El primer elemento del stack que tenga logo. `null` si ninguno tiene. */
export function logoDelStack(stack: string[]): Logo | null {
  for (const bruto of stack) {
    const clave = MAPA[bruto.trim().toLowerCase()];
    if (!clave) continue;
    const icono = (si as Record<string, { path: string; title: string }>)[clave];
    if (icono) return { path: icono.path, titulo: icono.title };
  }
  return null;
}

/** Todos los logos del stack, sin repetir. Para la fila de marcas de agua. */
export function logosDelStack(stack: string[], tope = 4): Logo[] {
  const vistos = new Set<string>();
  const salida: Logo[] = [];
  for (const bruto of stack) {
    const clave = MAPA[bruto.trim().toLowerCase()];
    if (!clave || vistos.has(clave)) continue;
    const icono = (si as Record<string, { path: string; title: string }>)[clave];
    if (!icono) continue;
    vistos.add(clave);
    salida.push({ path: icono.path, titulo: icono.title });
    if (salida.length >= tope) break;
  }
  return salida;
}
