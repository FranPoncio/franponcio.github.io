---
titulo: Tablero EVM en Power BI
resumen: Control de avance de obra por Earned Value Management sobre un gasoducto, con curva S, proyección de cierre y análisis de desvíos.
categoria: datos
tramo: proyecto
orden: 2
periodo: '2025'
rol: Modelo de datos y diseño del tablero
stack: ['Power BI', 'DAX', 'PBIP', 'EVM']
kpis:
  - label: Indicadores
    valor: SPI / CPI
    nota: 'plazo y costo contra plan'
  - label: Proyección
    valor: EAC
    nota: 'tres variantes de cálculo'
  - label: Formato
    valor: PBIP
    nota: 'versionable en git'
borrador: true
---

> **Texto de relleno.** El material real está en la rama
> `claude/power-bi-reports-playwright-tuqf5b` del repo `Data` — traelo acá.

## El problema

Un avance del 60 % no dice nada solo. ¿Contra qué plan? ¿A qué costo? El EVM
resuelve eso cruzando tres curvas a una fecha de corte:

| Curva | Qué es |
| ----- | ------ |
| **PV** | lo que estaba planificado gastar a esta altura |
| **EV** | lo que efectivamente se avanzó, valuado al presupuesto |
| **AC** | lo que realmente se gastó |

De ahí salen SPI y CPI, y con ellos la pregunta que importa en un comité de
obra: **¿cómo va a terminar esto si seguimos al ritmo actual?**

## Por qué Power BI y no una planilla

La planilla funcionaba para una obra. Con varias en paralelo, cada una terminaba
con su propia copia, su propia fórmula y su propia fecha de corte — y cuando
alguien encontraba un error, había que corregirlo en todas.

El modelo tabular invierte eso: las medidas se escriben una vez y se recalculan
solas al cambiar la fecha de corte o el filtro de obra. El mismo tablero sirve
para una obra o para la cartera completa.

## El modelo

- **Granularidad.** Por paquete de trabajo, con jerarquía de WBS para poder subir
  y bajar de nivel sin recalcular nada.

- **Medidas DAX.** SPI, CPI, SV, CV, EAC, ETC, VAC y TCPI. El detalle que más
  problemas evita: **las divisiones por cero devuelven vacío, no infinito**. Un
  CPI con AC = 0 no es "infinitamente eficiente" — es que todavía no hay
  información suficiente. Mostrar ∞ en un tablero de dirección es peor que no
  mostrar nada, porque parece un dato.

- **Time-phasing del PV.** Curva S: arranque lento, aceleración, desaceleración.
  El reparto lineal es cómodo y miente — ninguna obra gasta parejo desde el día
  uno, y usar una recta genera desvíos falsos en los primeros meses que después
  hay que salir a explicar.

- **Tres variantes de EAC.** Según el desvío sea sistémico, puntual o combinado
  de costo y plazo. Mostrar las tres juntas evita la discusión sobre cuál es la
  buena: la comparación entre ellas ya dice algo.

## Por qué PBIP importa

Guardar el informe en formato **PBIP** lo vuelve texto: se versiona en git, se
revisa en un diff, se compara entre ramas. Un `.pbix` es un binario opaco — no
podés ver qué cambió entre dos versiones, ni quién lo cambió, ni volver atrás
una medida sin restaurar el archivo entero.

Es una decisión de ingeniería aplicada a una herramienta de BI, y de las cosas
que menos gente cuenta.

## Relación con PMI Toolbox

Este tablero y [PMI Toolbox](/proyectos/pmiproject/) resuelven el mismo problema
por dos caminos: uno dentro de la herramienta que la organización ya usa, otro
como aplicación propia. **Que existan los dos dice más que cualquiera de los dos
por separado** — muestra que la herramienta se elige por contexto, no por
costumbre.

---

Las imágenes van en **esta misma carpeta**, al lado del `index.md`, y se
declaran en el frontmatter (`portada` y `galeria`). Astro las optimiza y les
pone hash automáticamente.
