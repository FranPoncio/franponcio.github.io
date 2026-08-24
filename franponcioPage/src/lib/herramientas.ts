import * as si from 'simple-icons';

/**
 * Las herramientas, agrupadas por para qué sirven.
 *
 * Antes eran dos cintas de 42 fichas corriendo sin rótulo, y ahí estaba el
 * problema: SAP, pandas o scikit-learn SÍ estaban, pero pasaban de largo entre
 * otras cuarenta y no se veían. Agrupadas y con título, cada fila se lee como
 * una respuesta a "¿con qué trabaja este tipo?".
 *
 * Hay dos tipos de ficha y la diferencia NO es estética:
 *   · `logo`   — la marca existe en el paquete simple-icons y se dibuja.
 * Los nombres largos van abreviados —Actions, Postgres, scikit, Looker— porque
 * en una cinta sin recuadro un nombre de catorce letras se come el lugar de
 * tres herramientas, y con el logo al lado se entiende igual.
 *
 *   · `nombre` — no existe y se escribe. Power BI, Tableau, Excel, Looker
 *                Studio y Salesforce están afuera porque Microsoft, Google y
 *                Salesforce pidieron que los saquen; ISO, Scrum, Lean, WCM,
 *                Kanban, PMBOK y EVM no son marcas de software sino normas y
 *                métodos, y no tienen logo que corresponda usar.
 *
 * Dibujar a mano una aproximación de una marca ajena sería peor que escribirla.
 */

export interface Ficha {
  nombre: string;
  /** El `d` del path si hay logo. */
  path?: string;
}

export interface Grupo {
  /** Clave de i18n del título de la fila. */
  clave: string;
  /** Token de color que identifica al grupo. */
  tono: string;
  items: Ficha[];
}

const conLogo = (slug: string, nombre?: string): Ficha => {
  const clave = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icono = (si as Record<string, { path: string; title: string }>)[clave];
  return icono ? { nombre: nombre ?? icono.title, path: icono.path } : { nombre: nombre ?? slug };
};
const n = (nombre: string): Ficha => ({ nombre });

export const grupos: Grupo[] = [
  {
    clave: 'stack.datos',
    tono: 'datos',
    items: [
      n('Power BI'),
      n('Tableau'),
      n('Looker'),
      n('DAX'),
      n('Power Query'),
      n('Excel'),
      n('SQL'),
      conLogo('postgresql', 'Postgres'),
      conLogo('mysql'),
      conLogo('googlebigquery', 'BigQuery'),
      n('ETL'),
    ],
  },
  {
    clave: 'stack.python',
    tono: 'ruta',
    items: [
      conLogo('python'),
      conLogo('pandas'),
      conLogo('numpy', 'NumPy'),
      conLogo('scipy', 'SciPy'),
      conLogo('scikitlearn', 'scikit'),
      n('Matplotlib'),
      n('Seaborn'),
      conLogo('plotly'),
      conLogo('jupyter'),
      conLogo('anaconda'),
    ],
  },
  {
    clave: 'stack.gestion',
    tono: 'gestion',
    items: [
      n('PMBOK'),
      n('EVM'),
      n('Scrum'),
      n('Kanban'),
      n('Lean'),
      n('WCM'),
      n('ISO 9001'),
      n('ISO 14001'),
      n('ISO 45001'),
    ],
  },
  {
    clave: 'stack.sistemas',
    tono: 'acento',
    items: [
      conLogo('sap'),
      n('ERP'),
      n('CRM'),
      n('Salesforce'),
      conLogo('jira'),
      conLogo('trello'),
      conLogo('notion'),
      conLogo('linux'),
      conLogo('qgis'),
    ],
  },
  {
    clave: 'stack.construyo',
    tono: 'herramienta',
    items: [
      conLogo('typescript'),
      conLogo('javascript'),
      conLogo('react'),
      conLogo('astro'),
      conLogo('tailwindcss', 'Tailwind'),
      conLogo('vite'),
      conLogo('vitest'),
      conLogo('leaflet'),
      n('Recharts'),
      conLogo('pwa', 'PWA'),
      conLogo('html5', 'HTML'),
      conLogo('css', 'CSS'),
      conLogo('git'),
      conLogo('github'),
      conLogo('githubactions', 'Actions'),
      conLogo('netlify'),
      conLogo('cplusplus', 'C++'),
    ],
  },
];
