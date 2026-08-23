---
titulo: PMI Toolbox
resumen: App de control de proyectos con un motor completo de Earned Value Management — línea base congelada, Earned Schedule y auditoría de quién cargó cada corte.
categoria: herramienta
tramo: proyecto
orden: 1
periodo: 2025 — 2026
rol: Diseño, desarrollo y pruebas
stack: ['React', 'TypeScript', 'Zustand', 'Dexie', 'Vitest', 'Tailwind']
kpis:
  - label: Motor
    valor: EVM + ES
    nota: 'PV, EV, AC, SPI, CPI, tres EAC, TCPI'
  - label: Pruebas
    valor: '135'
    nota: 'casos, sobre 15 archivos'
  - label: Código
    valor: '6.900'
    nota: 'líneas de TypeScript'
  - label: Backend
    valor: '0'
    nota: 'todo en el navegador (IndexedDB)'
enlace:
  label: Abrir la app
  url: https://franponcio.github.io/PMI-Toolbox/
---

## Por qué existe

Reporté avance de obra durante siete años. La herramienta que se usa casi
siempre es una planilla, y la planilla tiene un problema estructural: **cuando
alguien edita el plan, la línea base se mueve con él.** Al mes siguiente el
proyecto "cumple", porque el plan contra el que se lo mide es otro.

PMI Toolbox es la herramienta que me hubiera servido: un motor de Earned Value
Management sobre una **línea base que no se puede tocar sin dejar rastro**.

## Las decisiones que la definen

### La línea base se congela

Aprobás una foto del plan —presupuesto, pesos y fechas de cada paquete— y el
desempeño se mide contra esa foto. Editar un paquete después ya no la mueve.
Cambiar el alcance exige una **versión nueva** de la base, con historial y aviso
de divergencia. Es la diferencia entre un tablero que informa y uno que
tranquiliza.

### El motor va aparte de la interfaz

`src/core/` no sabe que existe React. Calcula PV, EV, AC, las variaciones, los
índices, las **tres variantes clásicas de EAC**, ETC, VAC y TCPI, y no dibuja
nada. Por eso se puede probar de verdad: **135 casos de prueba** sobre el motor,
el import de CSV, el almacenamiento y el estado.

### Atraso en tiempo, no sólo en plata

El EVM clásico dice cuánto dinero de trabajo falta, no cuándo se termina. La app
suma **Earned Schedule**: traduce el avance ganado a tiempo sobre la curva S y
proyecta una fecha de fin. Es la pregunta que hace el comité y que el EVM solo
no contesta.

### La conclusión antes que el gráfico

Cada pantalla abre con un veredicto escrito, y arriba de todo va el panel
**"Requiere decisión"**, ordenado por exposición económica y con el motivo
explícito de cada paquete fuera de plan. Nada de donuts ni de velocímetros:
texto, tablas y una curva S de líneas. Ningún número absoluto aparece sin su
comparación contra el plan.

### Sin servidor

Todo vive en el navegador con IndexedDB, detrás de un puerto `Repository` con
una cola de sincronización ya escrita. **La arquitectura para multi-dispositivo
está lista; falta el servidor**, que un sitio estático no despliega. Está dicho
en el README y no lo vendo como terminado.

## Qué hace, en concreto

- Multiproyecto, con WBS jerárquica y roll-up de los paquetes hoja.
- Cortes de avance, y el proyecto visto a cualquier fecha de corte histórica.
- Import de cronograma desde CSV de Excel, MS Project o P6, tolerando fechas
  `DD/MM/AAAA` y separadores de miles, con validación antes de importar.
- Import de avances y costos reales — el patrón ERP → EVM.
- Umbrales de SPI y CPI sensibles a la etapa del proyecto, criterio ISR / PMR.
- Bitácora de auditoría: quién cargó qué corte y cuándo.
- Export a CSV y reporte imprimible para comité, con riesgos, issues y próximos
  pasos.

## Lo que me llevé

Que el trabajo difícil de una herramienta de control no es el cálculo —el EVM
son diez fórmulas— sino **decidir qué no se puede hacer**. Que la base no se
mueva sola es una restricción, y es exactamente lo que la vuelve útil.
