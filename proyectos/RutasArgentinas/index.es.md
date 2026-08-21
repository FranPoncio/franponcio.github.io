---
titulo: Rutas Argentinas
resumen: Planificador de viajes a 413 puntos turísticos del país — rutea por 6 medios de transporte y cruza feeds GTFS oficiales para mostrar las líneas reales que pasan cerca.
categoria: herramienta
orden: 6
periodo: 2025 — 2026
rol: Diseño y desarrollo
stack: ['JavaScript', 'Leaflet', 'GTFS', 'Valhalla']
kpis:
  - label: Puntos turísticos
    valor: '413'
    nota: 'en 14 localidades'
  - label: Medios
    valor: '6'
    nota: 'cada uno con su perfil de ruteo'
  - label: Feeds GTFS
    valor: '2'
    nota: 'subte CABA e interurbano Córdoba'
enlace:
  label: Abrir la app
  url: https://franponcio.github.io/Data/
borrador: true
---

> **Texto de relleno.** Reemplazalo por lo tuyo.

## El problema

Planificar una salida cruza dos preguntas que viven en lugares distintos:
*adónde quiero ir* y *cómo llego*. Los datos existen —los puntos turísticos por
un lado, los horarios de transporte por otro— pero nadie los junta.

## Las decisiones

- **Ruteo real, sin API key.** Valhalla sobre OpenStreetMap: soporta los seis
  perfiles de transporte que necesitaba y no obliga a registrar una cuenta ni a
  vigilar una cuota.

- **Degradación elegante.** Si el ruteador no responde, la app muestra una ruta
  estimada en línea recta con una advertencia, en vez de romperse. Para una
  herramienta que depende de un servicio gratuito, eso no es un detalle: es la
  diferencia entre útil y frustrante.

- **GTFS de verdad.** El pipeline ingiere feeds oficiales y calcula qué paradas
  y qué líneas pasan cerca de cada punto turístico. Eso es trabajo de datos, no
  de mapas: hay que normalizar formatos, resolver calendarios de servicio y
  cruzar geometrías.

- **Todo vendorizado.** Leaflet y las tipografías viven en el repo. Sin CDN, sin
  depender de que un tercero siga online dentro de dos años.

## Lo que aprendí

Que la parte visible —el mapa, los pines, las rutas dibujadas— fue la mitad del
trabajo. La otra mitad, invisible, fue conseguir que los datos de transporte
cerraran.
