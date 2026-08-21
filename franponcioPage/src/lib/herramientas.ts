import * as si from 'simple-icons';

/**
 * Las herramientas, para la cinta que corre en el home.
 *
 * Hay dos tipos de ficha y la diferencia NO es estética:
 *   · `logo`   — la marca existe en el paquete simple-icons y se dibuja.
 *   · `nombre` — no existe, y se escribe. Power BI, Tableau y Excel están
 *                afuera porque Microsoft y Salesforce pidieron que los saquen;
 *                ISO, Scrum, Lean, WCM y Kanban no son marcas de software, son
 *                normas y métodos, y no tienen logo que corresponda usar.
 *
 * Dibujar a mano una aproximación de una marca ajena sería peor que escribirla.
 */

export interface Ficha {
  nombre: string;
  /** El `d` del path si hay logo. */
  path?: string;
}

const conLogo = (slug: string, nombre?: string): Ficha => {
  const clave = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icono = (si as Record<string, { path: string; title: string }>)[clave];
  return icono ? { nombre: nombre ?? icono.title, path: icono.path } : { nombre: nombre ?? slug };
};
const soloNombre = (nombre: string): Ficha => ({ nombre });

/** Fila de arriba: lo que toca los datos. */
export const filaDatos: Ficha[] = [
  soloNombre('Power BI'),
  soloNombre('Tableau'),
  soloNombre('DAX'),
  soloNombre('SQL'),
  soloNombre('Power Query'),
  soloNombre('Excel'),
  conLogo('python'),
  conLogo('pandas'),
  conLogo('numpy', 'NumPy'),
  conLogo('scikitlearn', 'scikit-learn'),
  conLogo('scipy', 'SciPy'),
  soloNombre('Matplotlib'),
  soloNombre('Seaborn'),
  conLogo('jupyter'),
  conLogo('plotly'),
  conLogo('anaconda'),
  conLogo('postgresql'),
  conLogo('mysql'),
  soloNombre('ETL'),
];

/** Fila de abajo: lo que ordena el trabajo, y con qué se construye. */
export const filaGestion: Ficha[] = [
  soloNombre('ISO 9001'),
  soloNombre('ISO 14001'),
  soloNombre('ISO 45001'),
  soloNombre('WCM'),
  soloNombre('Lean'),
  soloNombre('Kanban'),
  soloNombre('Scrum'),
  soloNombre('EVM'),
  soloNombre('PMBOK'),
  conLogo('sap'),
  soloNombre('ERP'),
  conLogo('jira'),
  conLogo('trello'),
  conLogo('notion'),
  conLogo('html5', 'HTML'),
  conLogo('css', 'CSS'),
  conLogo('javascript'),
  conLogo('typescript'),
  conLogo('react'),
  conLogo('astro'),
  conLogo('tailwindcss', 'Tailwind'),
  conLogo('git'),
  conLogo('cplusplus', 'C++'),
];
