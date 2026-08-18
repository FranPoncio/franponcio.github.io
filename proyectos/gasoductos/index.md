---
titulo: Indicadores de infraestructura de gas
resumen: Sistema de indicadores, tableros y reporting sobre la red de gas de Córdoba, preparado bajo estándares BID / IFC.
categoria: datos
orden: 1
periodo: '[2015 — 2024]'
rol: Indicadores, tableros y reporting
stack: ['Power BI', 'DAX', 'SQL', 'Power Query', 'ETL']
kpis:
  - label: Red gestionada
    valor: '12.000 km'
    nota: 'gasoductos y ramales'
  - label: Estaciones
    valor: '150'
    nota: 'de regulación de presión'
  - label: Conexiones
    valor: '500'
    nota: 'industriales'
  - label: Estándar
    valor: 'BID / IFC'
    nota: 'reporting a organismos'
borrador: true
---

> **Este es el caso que más te diferencia.** La estructura está armada; el
> contenido lo ponés vos. Leé la nota de confidencialidad al final **antes** de
> escribir — el repo es público.

## El contexto

Casi diez años en infraestructura pública de gas en Córdoba. La obra la hacían
otros: **lo tuyo era saber en qué estado estaba**, y que eso se pudiera reportar
a organismos que financian bajo estándares internacionales.

Ubicá al lector rápido: qué organización, qué escala, quién consumía la
información — dirección, organismos, áreas técnicas.

## El problema

Acá está lo interesante. Algunas preguntas que casi seguro respondiste:

- ¿De dónde salían los datos antes? ¿Planillas sueltas, sistemas que no se
  hablaban, partes de obra en papel?
- ¿Cuánto tardaba armar el informe mensual, y en qué se iba ese tiempo?
- ¿Qué pasaba cuando dos áreas reportaban el mismo avance con números distintos?

Esa última suele ser la más reveladora: el problema no era técnico, era que no
había una definición única de "avance".

## Qué construí

Las decisiones, no las tareas. Esto es lo que separa un caso de estudio de un
"hice dashboards":

- **Modelo de datos.** Qué granularidad elegiste — ¿por tramo? ¿por estación?
  ¿por obra? — y por qué esa y no otra.
- **Definición de los KPI.** Avance físico contra avance financiero es la trampa
  clásica: un 40 % de caño tendido no es un 40 % de presupuesto ejecutado. Contá
  cómo lo resolviste y qué discusión destrabó.
- **El estándar BID / IFC.** Qué exigía y cómo condicionó el modelo. **Esto es
  lo que más te diferencia**: mucha gente hace Power BI, muy poca reportó bajo
  estándar de organismo multilateral.
- **ETL.** De dónde venían los datos y qué hubo que limpiar para que cerraran.

## Resultado

Con qué se decidía después que no se podía decidir antes. Si podés, una decisión
concreta que se tomó mirando el tablero.

---

### ⚠ Antes de publicar: confidencialidad

Los datos operativos de la red **son de tu empleador, no tuyos**. Y este repo es
público: lo que subas queda en el historial de git aunque después lo borres.

Lo que sí es tuyo es el **método**: el modelo de datos, la definición de los
indicadores, la arquitectura del reporting. Eso es lo que vale y lo que podés
mostrar sin problema.

- Capturas con **datos sintéticos** o agregados, nunca cifras reales de operación.
- Contá el **cómo**, no los valores que arrojó.
- Las cifras de escala que ya tenés públicas en tu perfil de GitHub (12.000 km,
  150 estaciones, 500 conexiones) sirven para dar contexto.

Un caso bien escrito sin un solo dato real vale más que uno con datos que no
podés mostrar.

Las imágenes van en `franponcio/public/proyectos/gasoductos/` y se referencian
como `/proyectos/gasoductos/archivo.png`.
