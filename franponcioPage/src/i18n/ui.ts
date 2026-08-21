/**
 * Textos de la interfaz en los dos idiomas.
 *
 * Acá va SÓLO lo que está escrito en el código (títulos de sección, botones,
 * avisos). El contenido de los proyectos vive en sus .md — ver content.config.ts.
 *
 * Para agregar un texto nuevo: sumalo a `es` y a `en`. Si te olvidás de uno,
 * TypeScript marca el error antes de que llegue al sitio.
 */
export const IDIOMAS = ['es', 'en'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

export const ui = {
  es: {
    'nav.contacto': 'Contacto',
    'nav.volver': '← volver al panel',

    'hero.rubro': 'Ingeniería industrial × Datos',
    'hero.bajada':
      'Convierto datos de operación en información con la que se puede decidir. Casi diez años en infraestructura pública de gas en Córdoba, armando los indicadores y el reporting detrás de la obra.',
    'hero.gasoductos': 'Gasoductos',
    'hero.estaciones': 'Estaciones',
    'hero.conexiones': 'Conexiones ind.',
    'hero.anios': 'Años',

    'formacion.titulo': 'Formación',
    'formacion.bajada': 'Certificaciones y cursos — lo hecho, lo en curso y lo que viene.',
    'formacion.cursando': 'Cursando',
    'formacion.completado': 'Completado',
    'formacion.planificado': 'En planificación',
    'formacion.credencial': 'Ver credencial',
    'formacion.certificado': 'Certificado',
    'formacion.verCertificado': 'ver certificado ↗',
    'formacion.insignia': 'insignia generada — no es un certificado',
    'formacion.proximo': 'Lo que viene',
    'nav.traza': 'La traza',
    'traza.pie': '↔ La traza se recorre de costado — 2013 → 2026',
    'herramientas.titulo': 'Stack',
    'herramientas.bajada':
      'Herramientas y métodos con los que trabajo: datos y visualización arriba, gestión y construcción abajo. Pasá el mouse para frenar la cinta.',
    'carrusel.anterior': 'Ver el anterior',
    'carrusel.siguiente': 'Ver el siguiente',

    'grupo.datos': 'Datos y BI',
    'grupo.datos.bajada': 'Indicadores, tableros y reporting sobre operación real.',
    'grupo.gestion': 'Gestión y normas',
    'grupo.gestion.bajada': 'Sistemas de gestión, auditoría y certificación.',
    'grupo.herramienta': 'Herramientas',
    'grupo.herramienta.bajada': 'Software que escribí para resolver un problema concreto.',

    'proyecto.destacado': 'Proyecto destacado',
    'proyecto.ver': 'ver el caso →',
    'proyecto.borrador': 'borrador',
    'proyecto.periodo': 'Período',
    'proyecto.rol': 'Rol',
    'proyecto.anterior': '← Anterior',
    'proyecto.siguiente': 'Siguiente →',
    'proyecto.registro': 'Registro',
    'proyecto.deslizar': 'deslizá para ver las',

    'aviso.borrador': 'BORRADOR — completá este archivo y sacá `borrador: true` del frontmatter.',
    'aviso.soloEspanol': 'Este caso todavía está sólo en español.',
  },

  en: {
    'nav.contacto': 'Contact',
    'nav.volver': '← back to the panel',

    'hero.rubro': 'Industrial engineering × Data',
    'hero.bajada':
      'I turn operational data into information people can actually decide with. Nearly ten years in public gas infrastructure in Córdoba, building the indicators and reporting behind the works.',
    'hero.gasoductos': 'Pipelines',
    'hero.estaciones': 'Stations',
    'hero.conexiones': 'Industrial conn.',
    'hero.anios': 'Years',

    'formacion.titulo': 'Education',
    'formacion.bajada': 'Certifications and courses — done, in progress, and planned.',
    'formacion.cursando': 'In progress',
    'formacion.completado': 'Completed',
    'formacion.planificado': 'Planned',
    'formacion.credencial': 'View credential',
    'formacion.certificado': 'Certificate',
    'formacion.verCertificado': 'view certificate ↗',
    'formacion.insignia': 'generated badge — not a certificate',
    'formacion.proximo': 'Coming up',
    'nav.traza': 'The route',
    'traza.pie': '↔ The route runs sideways — 2013 → 2026',
    'herramientas.titulo': 'Stack',
    'herramientas.bajada':
      'Tools and methods I work with: data and visualisation on top, management and build below. Hover to stop the belt.',
    'carrusel.anterior': 'Previous',
    'carrusel.siguiente': 'Next',

    'grupo.datos': 'Data & BI',
    'grupo.datos.bajada': 'Indicators, dashboards and reporting on real operations.',
    'grupo.gestion': 'Management & standards',
    'grupo.gestion.bajada': 'Management systems, auditing and certification.',
    'grupo.herramienta': 'Tools',
    'grupo.herramienta.bajada': 'Software I wrote to solve a specific problem.',

    'proyecto.destacado': 'Featured project',
    'proyecto.ver': 'read the case →',
    'proyecto.borrador': 'draft',
    'proyecto.periodo': 'Period',
    'proyecto.rol': 'Role',
    'proyecto.anterior': '← Previous',
    'proyecto.siguiente': 'Next →',
    'proyecto.registro': 'Gallery',
    'proyecto.deslizar': 'swipe to see all',

    'aviso.borrador': 'DRAFT — fill this file in and remove `borrador: true` from the frontmatter.',
    'aviso.soloEspanol': 'This case is only available in Spanish for now.',
  },
} as const;

/** Devuelve la función de traducción para un idioma. */
export function usarTraduccion(lang: Idioma) {
  return function t(clave: keyof (typeof ui)['es']): string {
    return ui[lang][clave];
  };
}

/** Prefijo de ruta: el español va en la raíz, el inglés bajo /en/. */
export function rutaIdioma(lang: Idioma, ruta = ''): string {
  const limpia = ruta.replace(/^\//, '');
  return lang === 'es' ? `/${limpia}` : `/en/${limpia}`;
}
