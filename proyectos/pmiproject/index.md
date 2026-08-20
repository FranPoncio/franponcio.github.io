---
titulo: PMI Toolbox
resumen: App de control de proyectos con un motor completo de Earned Value Management — línea base congelada, earned schedule, WBS jerárquica y log de auditoría.
categoria: herramienta
orden: 5
periodo: 2025 — 2026
rol: Diseño y desarrollo
stack: ['React', 'TypeScript', 'Dexie', 'Vitest', 'Tailwind']
kpis:
  - label: Motor
    valor: EVM
    nota: 'SPI, CPI, EAC, ETC, VAC, TCPI'
  - label: Tests
    valor: Vitest
    nota: 'suite sobre el core'
  - label: Persistencia
    valor: IndexedDB
    nota: 'todo local, sin backend'
enlace:
  label: Abrir la app
  url: https://franponcio.github.io/PMI-Toolbox/
borrador: true
---

> **Texto de relleno.** Acá va el **caso de estudio**, no el código: la app vive
> en [su propio repo](https://github.com/FranPoncio/PMI-Toolbox). Ver la nota
> del final.

## El problema

Las herramientas de control de proyectos que había a mano se dividían en dos
grupos: las que hacían EVM de verdad y costaban una licencia por usuario, y las
gratuitas que llamaban "avance" al porcentaje que uno escribía a mano.

Ninguna servía para lo que necesitaba: cargar una obra, congelar una línea base
y ver cómo se despega la ejecución del plan, sin subir datos de proyecto a un
servidor ajeno.

## Las decisiones que importan

- **El core no sabe que existe React.** Toda la lógica de EVM vive en
  `src/core/` como funciones puras. Se testea sola, corre en milisegundos y no
  se rompe cuando cambia el diseño. La UI es una capa encima, reemplazable.

- **`null` en vez de `Infinity`.** Un CPI con AC = 0 no es infinito: es "sin
  información suficiente todavía". Decidirlo temprano evitó que la interfaz
  tuviera que limpiar basura después, y es la clase de detalle que define si un
  indicador se puede mostrar a un director sin aclaración.

- **Línea base congelada.** El refactor de `WorkPackage` a `PlannedItem` fue
  exactamente para esto: separar el plan vivo del plan de referencia. Sin esa
  separación, comparar contra "el plan" no significa nada porque el plan se
  mueve.

- **Todo local.** IndexedDB vía Dexie: sin cuenta, sin backend, sin subir datos
  de obra a ningún lado. Para el caso de uso —datos de proyecto de un cliente—
  eso no es una limitación, es el requisito.

## Relación con el tablero de Power BI

Este proyecto y el [tablero EVM](/proyectos/evm-powerbi/) resuelven el mismo
problema por dos caminos. Contar por qué existen los dos dice más que cualquiera
de los dos por separado.

---

### Por qué el código no está en esta carpeta

`PMI-Toolbox` tiene noventa y siete archivos, dependencias, tests y su propio
CI. Copiarlo acá adentro genera **dos copias que se desincronizan** — que es
exactamente lo que pasó con `pmtool/` dentro del repo `Data`, donde la copia
vieja se quedó atrás sin que nadie se enterara.

La carpeta se queda con el caso escrito y las capturas; el botón "Abrir la app"
lleva al deploy real.
