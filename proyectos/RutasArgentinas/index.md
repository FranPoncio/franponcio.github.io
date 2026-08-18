---
titulo: Rutas Argentinas
resumen: Planificador de viajes a 413 puntos turísticos del país — rutea por 6 medios de transporte y cruza feeds GTFS oficiales para mostrar las líneas reales que pasan cerca.
categoria: herramienta
orden: 7
periodo: '[2025 — 2026]'
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

> **Renombré tu `web` a esto** porque supuse que te referías a este proyecto.
> Si "web" era otra cosa, decime y lo cambio — la carpeta se llama `web/` y el
> título sale del frontmatter, así que es un renombre trivial.

## El problema

Planificar una salida cruzando "adónde quiero ir" con "cómo llego" es
sorprendentemente molesto: los datos están, pero repartidos.

## Las decisiones

- **Ruteo real, sin API key.** Valhalla de OpenStreetMap, que soporta justo los
  6 perfiles de transporte.
- **Degradación elegante.** Si el ruteador no responde, muestra una ruta
  estimada en vez de romperse.
- **GTFS de verdad.** El pipeline ingiere feeds oficiales y calcula qué paradas
  y líneas pasan cerca de cada punto. Eso es trabajo de datos, no de mapas.
- **Todo vendorizado.** Leaflet y las fuentes viven en el repo: sin CDN, sin
  depender de que un tercero siga online.

## Lo que aprendí

El cierre honesto.
