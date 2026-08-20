---
titulo: Tablero EVM en Power BI
resumen: Control de avance de obra por Earned Value Management sobre un gasoducto, con curva S y análisis de desvíos.
categoria: datos
orden: 2
periodo: '[2025]'
rol: Modelo de datos y diseño del tablero
stack: ['Power BI', 'DAX', 'PBIP', 'EVM']
kpis:
  - label: Indicadores
    valor: 'SPI / CPI'
    nota: 'plazo y costo contra plan'
  - label: Proyección
    valor: 'EAC'
    nota: 'tres variantes de cálculo'
  - label: Formato
    valor: 'PBIP'
    nota: 'versionable en git'
borrador: true
---

> **Este trabajo ya lo tenés hecho**, en la rama
> `claude/power-bi-reports-playwright-tuqf5b` del repo `Data`. Traelo acá antes
> de que se pierda ahí.

## El problema

Un avance del 60 % no dice nada solo. ¿Contra qué plan? ¿A qué costo? El EVM
resuelve eso cruzando tres curvas a una fecha de corte:

| Curva | Qué es |
| ----- | ------ |
| **PV** | lo que estaba planificado gastar |
| **EV** | lo que efectivamente se avanzó, valuado al presupuesto |
| **AC** | lo que realmente se gastó |

De ahí salen SPI y CPI, y con ellos la pregunta que importa: **¿cómo va a
terminar esto si seguimos así?**

## Por qué Power BI y no una planilla

La decisión de fondo. Contá qué te daba el modelo tabular que Excel no: el
modelo de datos reutilizable, las medidas que se recalculan solas al cambiar la
fecha de corte, el mismo tablero sirviendo a varias obras.

## El modelo

- **Granularidad.** Por paquete de trabajo, con jerarquía de WBS.
- **Medidas DAX.** SPI, CPI, SV, CV, EAC, ETC, VAC, TCPI. Ojo con las divisiones
  por cero: un CPI con AC = 0 tiene que devolver **vacío**, no infinito. Un
  indicador indefinido significa "sin información suficiente todavía", y
  mostrarlo como ∞ en un tablero de dirección es peor que no mostrarlo.
- **Time-phasing del PV.** La curva S — arranque lento, aceleración,
  desaceleración. El reparto lineal es cómodo y miente: ninguna obra gasta parejo
  desde el día uno.

## Por qué PBIP importa

Guardar el informe en formato **PBIP** lo vuelve texto: se versiona en git, se
revisa en un diff, se compara entre ramas. Un `.pbix` es un binario opaco — no
podés ver qué cambió entre dos versiones ni quién lo cambió.

Es una decisión de ingeniería aplicada a una herramienta de BI, y es de las
cosas que menos gente cuenta. Vale la pena dedicarle un párrafo.

## Relación con PMI Toolbox

Este tablero y [PMI Toolbox](/proyectos/pmiproject/) resuelven el mismo problema
por dos caminos: uno dentro de la herramienta que la organización ya usa, otro
como aplicación propia. **Contar por qué existen los dos dice más de vos que
cualquiera de los dos por separado** — muestra que elegís la herramienta según el
contexto y no por costumbre.

---

Las imágenes van en **esta misma carpeta**, al lado del `index.md`, y se
declaran en el frontmatter (`portada` y `galeria`). Astro las optimiza y les
pone hash automáticamente — una foto de 4 MB no se sirve en tamaño original.
