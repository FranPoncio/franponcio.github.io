---
titulo: Indicadores de infraestructura de gas
resumen: Sistema de indicadores, tableros y reporting sobre la red de gas de Córdoba, preparado bajo estándares BID / IFC.
categoria: datos
orden: 1
periodo: 2016 — 2023
rol: Indicadores, tableros y reporting
stack: ['Power BI', 'DAX', 'SQL', 'Power Query', 'ETL']
kpis:
  - label: Red gestionada
    valor: 12.000 km
    nota: 'gasoductos y ramales'
  - label: Estaciones
    valor: '150'
    nota: 'de regulación de presión'
  - label: Conexiones
    valor: '500'
    nota: 'industriales'
  - label: Estándar
    valor: BID / IFC
    nota: 'reporting a organismos'

portada:
  src: ./portada.png
  alt: '[Reemplazar por una foto real: traza del gasoducto o sala de control]'

galeria:
  - src: ./traza.png
    alt: '[Reemplazar por una captura del tablero con datos sintéticos]'
    pie: '[Pie de foto — qué muestra y por qué importa]'
  - src: ./estacion.png
    alt: '[Reemplazar por un diagrama del modelo de datos]'
    pie: '[Pie de foto]'

borrador: true
---

> **Texto de relleno.** Reemplazalo por lo tuyo. Leé la nota de confidencialidad
> del final **antes** de escribir — el repo es público.

## El contexto

Siete años en infraestructura pública de gas en Córdoba. La obra la hacían
otros: lo mío era **saber en qué estado estaba** y que eso se pudiera reportar a
los organismos que financian, bajo sus estándares.

La red incluye gasoductos troncales, ramales de distribución, estaciones de
regulación de presión y conexiones industriales. Cada uno de esos activos tiene
un ciclo distinto: se proyecta, se licita, se ejecuta, se habilita, se opera. El
reporting tenía que cubrir todo eso con una sola definición de "avance".

## El problema

Los datos existían, pero repartidos: el avance físico lo llevaba inspección en
planillas por obra, el financiero venía de administración con otro corte de
fechas, y las habilitaciones las registraba operaciones en un sistema aparte.

Armar el informe mensual llevaba una semana, y la mayor parte de ese tiempo no
era analizar: era conciliar. Cuando dos áreas reportaban avances distintos para
la misma obra, casi nunca era un error de carga — **era que cada una entendía
"avance" de una manera distinta**.

Esa fue la observación que ordenó todo el proyecto. El problema no era de
herramientas.

## Qué construí

- **Granularidad por tramo, no por obra.** Una obra puede tener frentes en
  estados muy distintos; promediarlos esconde justo lo que hay que ver. El tramo
  es la unidad más chica que tiene certificación propia, y por eso es la que
  permite reconciliar lo físico con lo financiero sin inventar prorrateos.

- **Avance físico y financiero como métricas separadas, siempre juntas en
  pantalla.** No se promedian ni se combinan en un índice único. Un 40 % de caño
  tendido no es un 40 % de presupuesto ejecutado, y la brecha entre las dos
  curvas es la información — no un error a corregir.

- **El estándar BID / IFC.** Exigía trazabilidad del dato hasta el documento
  respaldatorio: cada número del informe tiene que poder señalar el certificado
  que lo origina. Eso condicionó el modelo entero — obligó a guardar el vínculo
  al documento como parte del hecho, no como un anexo. Es la parte que no habría
  hecho por mi cuenta y la que más valor terminó teniendo.

- **ETL.** Ingesta de las tres fuentes con normalización de fechas al corte
  contable y validaciones que rechazan la carga en vez de dejar pasar un dato
  inconsistente.

## Resultado

El informe mensual pasó de una semana a un día, pero lo importante no fue el
tiempo: fue que **la discusión cambió de tema**. Se dejó de discutir de quién
era el número correcto para empezar a discutir qué hacer con él.

---

### ⚠ Antes de publicar: confidencialidad

Los datos operativos de la red **son de tu empleador, no tuyos**. Y este repo es
público: lo que subas queda en el historial de git aunque después lo borres.

Lo que sí es tuyo es el **método** — el modelo de datos, la definición de los
indicadores, la arquitectura del reporting.

- Capturas con **datos sintéticos** o agregados, nunca cifras reales de operación.
- Contá el **cómo**, no los valores que arrojó.
- Las cifras de escala que ya tenés públicas en tu perfil de GitHub (12.000 km,
  150 estaciones, 500 conexiones) sirven para dar contexto.

Las imágenes van en **esta misma carpeta**, al lado del `index.md`, y se
declaran en el frontmatter. Astro las optimiza y les pone hash automáticamente.
