---
titulo: Rutas Argentinas
resumen: Planificador de viajes a 413 puntos turísticos del país — rutea por seis medios de transporte y cruza feeds GTFS oficiales para mostrar las líneas reales que pasan cerca de cada lugar.
categoria: herramienta
tramo: proyecto
orden: 2
periodo: 2025 — 2026
rol: Diseño, datos y desarrollo
stack: ['JavaScript', 'Leaflet', 'Valhalla', 'GTFS', 'OpenStreetMap']
kpis:
  - label: Puntos
    valor: '413'
    nota: 'en 14 localidades y 12 provincias'
  - label: Transporte
    valor: '6'
    nota: 'perfiles de ruteo distintos'
  - label: Datos
    valor: GTFS
    nota: 'feeds oficiales, procesados offline'
  - label: Dependencias
    valor: '0'
    nota: 'sin framework ni build'
enlace:
  label: Abrir la app
  url: https://franponcio.github.io/Data/
---

## Qué resuelve

Elegís un destino y la app arma la ruta desde donde estés, en el medio de
transporte que uses. Da dos: **la más corta**, y una **escénica** que pasa por
otro punto turístico ubicado de camino entre la salida y la llegada.

## Los datos son el trabajo

La app en sí son 660 líneas. **La base de datos son 5.300**: 413 puntos
turísticos cargados a mano en 14 localidades de 12 provincias, cada uno con
coordenadas, categoría, foto de Wikimedia, precio de entrada, cómo llegar en
transporte público y una reseña histórica.

Están las que se esperan —Buenos Aires, Bariloche, Mendoza, Salta, Ushuaia,
Iguazú, El Calafate, Humahuaca— y los valles cordobeses de **Punilla** y
**Calamuchita**, que no suelen aparecer en este tipo de listas.

## Las decisiones técnicas

### Ruteo real, sin API key

El ruteo lo hace el servidor público de **Valhalla** de OpenStreetMap, que
soporta justamente los seis perfiles que necesitaba: auto, moto, bicicleta,
monopatín, colectivo y a pie. Cada modo recalcula distancia y tiempo con su
propio perfil, no con una regla de tres sobre la distancia en línea recta.

**Si el ruteador no responde, la app no se rompe**: degrada a una ruta estimada
con la velocidad típica del modo y lo dice.

### GTFS procesado antes, no en vivo

El transporte público no sale de un texto escrito a mano: sale de **feeds GTFS
oficiales**. Un script del repo los lee y, para cada punto turístico, resuelve
las paradas y líneas reales que pasan dentro de un radio configurable —hoy
650 metros—. El resultado se guarda como un JSON chico que la app carga de una.

Es la misma decisión de siempre: **el cruce pesado se hace una vez, en el
pipeline, no en el navegador de cada visitante.** Agregar una ciudad es agregar
una línea al archivo de fuentes y volver a correr el script.

### Sin framework

No hay React, no hay build, no hay `node_modules` en producción. Leaflet para el
mapa y JavaScript a secas. Para una app que es sobre todo datos y un mapa, un
framework era peso sin contrapartida.

## Honestidad sobre los datos

Los precios de entrada y la información de transporte están marcados como
**orientativos** dentro de la app. Argentina tiene inflación alta y las líneas
de colectivo cambian: presentarlos como dato oficial sería mentir con formato de
verdad.
