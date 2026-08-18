---
titulo: PMI Toolbox
resumen: App de control de proyectos con un motor completo de Earned Value Management — línea base congelada, earned schedule, WBS jerárquica y log de auditoría.
categoria: herramienta
orden: 5
periodo: '[2025 — 2026]'
rol: Diseño y desarrollo
stack: ['React', 'TypeScript', 'Dexie', 'Vitest', 'Tailwind']
kpis:
  - label: Motor
    valor: 'EVM'
    nota: 'SPI, CPI, EAC, ETC, VAC, TCPI'
  - label: Tests
    valor: 'Vitest'
    nota: 'suite sobre el core'
  - label: Persistencia
    valor: 'IndexedDB'
    nota: 'via Dexie, todo local'
enlace:
  label: Abrir la app
  url: https://franponcio.github.io/PMI-Toolbox/
borrador: true
---

> **Ojo con esta carpeta.** Acá va el **caso de estudio**, no el código.
> La app vive en su propio repo ([PMI-Toolbox](https://github.com/FranPoncio/PMI-Toolbox)),
> con sus tests y su deploy. Ver la nota del final.

## El problema

Contá qué no resolvían las herramientas que ya usabas. Por qué una app propia
y no una planilla ni MS Project.

## Las decisiones que importan

- **El core sin React.** La lógica de EVM vive en `src/core/` como funciones
  puras, sin nada de UI. Se testea sola y no se rompe cuando cambia el diseño.
- **`null` en vez de `Infinity`.** Un CPI con AC = 0 no es infinito: es "sin
  información suficiente todavía". Decidir eso temprano evita que la UI muestre
  basura.
- **Línea base congelada.** El refactor `WorkPackage` → `PlannedItem` fue para
  esto: comparar contra un plan que no se mueve.
- **Todo local.** IndexedDB via Dexie: sin backend, sin cuenta, sin subir datos
  de proyecto a ningún lado.

## Relación con el tablero de Power BI

Este proyecto y el [tablero EVM](/proyectos/evm-powerbi/) resuelven el mismo
problema por dos caminos: uno en la herramienta que ya usa la organización, otro
como app propia. Contar por qué existen los dos dice más de vos que cualquiera
de los dos por separado.

---

### Por qué el código no está en esta carpeta

`PMI-Toolbox` tiene 97 archivos, dependencias, tests y su propio CI. Si copiás
ese código acá adentro, terminás con **dos copias que se desincronizan** — que
es exactamente el problema que tuvimos con `pmtool/` dentro de `Data`, donde la
copia vieja se quedó atrás sin que nadie se enterara.

La carpeta se queda con el caso escrito y las capturas
(`public/proyectos/pmiproject/`), y el botón "Abrir la app" lleva al deploy real.
