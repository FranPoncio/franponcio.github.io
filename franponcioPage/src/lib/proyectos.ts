import { getCollection, type CollectionEntry } from 'astro:content';
import type { Idioma } from '../i18n/ui';

export type Proyecto = CollectionEntry<'proyectosEs'> | CollectionEntry<'proyectosEn'>;

export interface ProyectoResuelto {
  entrada: Proyecto;
  /** true = no hay traducción y se está mostrando el español. */
  esRespaldo: boolean;
}

/**
 * Devuelve los proyectos en el idioma pedido, ordenados.
 *
 * Si un proyecto no tiene traducción al inglés, cae de vuelta al español y lo
 * marca con `esRespaldo`. Así se puede traducir de a poco: la página en inglés
 * nunca queda con huecos ni con un 404.
 */
export async function obtenerProyectos(lang: Idioma): Promise<ProyectoResuelto[]> {
  const es = await getCollection('proyectosEs');
  if (lang === 'es') {
    return es
      .sort((a, b) => a.data.orden - b.data.orden)
      .map((entrada) => ({ entrada, esRespaldo: false }));
  }

  const en = await getCollection('proyectosEn');
  const porId = new Map(en.map((e) => [e.id, e]));

  // Se recorre la lista española para que el orden y el conjunto de proyectos
  // sea el mismo en los dos idiomas.
  return es
    .sort((a, b) => a.data.orden - b.data.orden)
    .map((entradaEs) => {
      const traducida = porId.get(entradaEs.id);
      return traducida
        ? { entrada: traducida as Proyecto, esRespaldo: false }
        : { entrada: entradaEs as Proyecto, esRespaldo: true };
    });
}
