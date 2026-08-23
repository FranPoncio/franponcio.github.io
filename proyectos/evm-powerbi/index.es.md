---
titulo: Tablero EVM en Power BI
resumen: Control de avance de obra por Earned Value Management sobre un gasoducto, armado como proyecto de texto plano — se versiona, se revisa en un PR y se regenera con un comando.
categoria: datos
tramo: proyecto
orden: 2
periodo: '2026'
rol: Modelo de datos y tablero
stack: ['Power BI', 'DAX', 'PBIP', 'TMDL', 'EVM']
kpis:
  - label: Medidas DAX
    valor: '22'
    nota: 'replican un motor de EVM con 41 tests'
  - label: Formato
    valor: PBIP
    nota: 'TMDL + PBIR, texto plano y versionable'
  - label: Paquetes
    valor: '7'
    nota: '35 reportes de avance'
  - label: SPI · CPI
    valor: 0,75 · 0,90
    nota: 'a la fecha de corte, sobre datos sintéticos'
enlace:
  label: Ver el proyecto PBIP
  url: https://github.com/FranPoncio/Data/tree/claude/power-bi-reports-playwright-tuqf5b/powerbi
borrador: false
---

## El problema

Un avance del 60 % no dice nada solo. ¿Contra qué plan? ¿A qué costo? El Earned
Value Management resuelve eso cruzando tres magnitudes a una fecha de corte: lo
que **debería** llevar gastado según el plan (PV), lo que **vale** lo realmente
ejecutado (EV) y lo que **efectivamente** costó (AC). De ahí salen dos números
que sí dicen algo — SPI para el plazo, CPI para el costo — y de ahí, la
proyección de cómo va a cerrar la obra.

## La decisión de fondo: que el tablero sea texto

Un `.pbix` es un binario. No se puede leer en un pull request, no se puede
diffear, no se puede revisar. Cae en la misma trampa que el Excel que se pasa
por mail: existe una versión buena y nadie sabe cuál es.

El proyecto está en **PBIP**, que es el mismo tablero pero en texto plano: el
modelo en TMDL, el informe en PBIR con un JSON por visual. Se versiona, se
revisa y se regenera con `npm run powerbi`. Un cambio en una medida es una
línea en un diff, no un archivo nuevo de 4 MB.

Los datos van **embebidos en el modelo** como literales `#table` de M, y no
apuntando a los CSV que están al lado. No es capricho: Power BI no resuelve
rutas relativas, así que un `.pbip` enganchado a un archivo local abre sólo en
la máquina donde se creó. Embebido abre en cualquiera, y además los datos
aparecen en el diff.

## Las dos medidas que sostienen a las otras veinte

De las 22 medidas, hay dos que no se ven en ningún visual y sin las cuales el
resto da mal:

- **`Último corte`** — la fecha del avance más reciente, *ignorando los filtros
  de fecha*. Es el data date real de la obra.
- **`Fecha de análisis`** — a qué fecha se evalúan PV, EV y AC. Si el visual
  filtra por tiempo (el eje de meses de la curva S) usa el fin de ese período;
  si no filtra (una tarjeta de KPI) usa el último corte.

```dax
Fecha de análisis =
    IF ( ISCROSSFILTERED ( Calendario ),
         MAX ( Calendario[Fecha] ),
         [Último corte] )
```

Sin esa segunda medida las tarjetas mostrarían **el PV al final del proyecto en
lugar del PV a hoy** — un número enorme, perfectamente creíble y completamente
equivocado. Es el tipo de error que no rompe nada y se detecta tarde.

El PV se distribuye en el tiempo con una curva S —smoothstep de Hermite,
`3t²−2t³`— sobre la ventana de baseline de cada paquete. EV y AC toman, para
cada paquete, su último reporte con fecha menor o igual a la de análisis, y
quedan en `BLANK` más allá del último corte: así la línea del gráfico **se
corta** ahí en vez de desplomarse a cero, que es lo que haría creer que la obra
se frenó.

## Cómo se verifica que las medidas no mienten

Las medidas DAX replican un motor de EVM escrito antes en TypeScript
(`evm.ts`, con **41 tests**). Traducirlo a DAX es reescribirlo, y una
reescritura se rompe en silencio.

La verificación va por un camino distinto al del tablero:
`check-powerbi-data.mjs` calcula los indicadores **en JavaScript** sobre los
mismos datos y deja la tabla de resultados esperados en el README. Si el
tablero no muestra esos números, hay un error en las medidas. Dos
implementaciones independientes que tienen que coincidir.

A la fecha de corte, sobre los 7 paquetes y 35 reportes de avance del caso:

| | |
|---|---:|
| BAC | $23.200.000 |
| PV | $11.323.519 |
| EV | $8.456.000 |
| AC | $9.440.000 |
| SPI | 0,75 |
| CPI | 0,90 |
| EAC (BAC/CPI) | $25.899.716 |
| VAC | −$2.699.716 |
| TCPI hasta BAC | 1,07 |

La obra viene atrasada y con sobrecosto, empujada por el tendido del ducto:
**36,4 % de avance real contra 48,8 % planificado**, y se proyecta cerrar $2,7 M
por encima del presupuesto autorizado.

Una diferencia de forma entre las dos implementaciones: donde el TypeScript
devuelve `null` al dividir por cero, el DAX usa `DIVIDE`, que devuelve `BLANK`.
Misma semántica de «indefinido» — que no es lo mismo que cero.

## Qué se ve

**Resumen EVM.** Seis tarjetas (BAC, PV, EV, AC, CPI, SPI), la curva S de
planificado contra ganado contra real, las cuatro proyecciones al cierre (EAC,
VAC, ETC, TCPI) y el desvío de costo por paquete.

**Paquetes de trabajo.** El EVM completo por paquete y dos barras con CPI y SPI,
para ver de dónde sale el desvío. Son 19 visuales, todos generados por script.

## Lo que este tablero todavía no es

Tres cosas, y prefiero decirlas acá antes de que las descubra quien lo abra:

- **Los datos son sintéticos.** Salen del fixture del caso GC-3, no de una obra
  real. Los números de operación de un gasoducto no son míos para publicar.
- **El historial mensual está interpolado.** El fixture tiene un solo corte, y
  una curva S con un único punto de EV/AC no se puede graficar. El último corte
  reproduce el fixture exacto —eso lo verifica el script—; los anteriores son
  plausibles, no medidos.
- **El informe se generó sin poder abrirlo.** El PBIR se escribió contra la
  estructura documentada del formato, pero Power BI Desktop es sólo Windows.
  El modelo semántico es la parte sólida y está verificado; de los visuales
  puedo decir que están bien formados, no que carguen.

Y una advertencia de uso: los generadores son de ida nomás. En cuanto abrís el
`.pbip` y guardás, Desktop reescribe los archivos con su propio formato y pasa
a ser el dueño del informe. Sirven para arrancar y para rehacer desde cero, no
para ir y volver.
