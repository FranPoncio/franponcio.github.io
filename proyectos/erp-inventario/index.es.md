---
titulo: Políticas de inventario sobre ERP y CRM
resumen: Lo próximo que voy a construir — una capa de políticas de inventario sobre los datos del ERP y el CRM, para que las reglas de stock vivan escritas y no en la cabeza de alguien.
categoria: herramienta
orden: 4
periodo: 2026 —
rol: Diseño y desarrollo
stack: ['ERP', 'CRM', 'SQL', 'TypeScript', 'Políticas de inventario']
kpis:
  - label: Estado
    valor: En diseño
    nota: 'todavía no hay código'
  - label: Origen
    valor: '2013 — 2016'
    nota: 'el problema que vi en el depósito'
  - label: Alcance
    valor: 'ERP + CRM'
    nota: 'stock, rotación y demanda'
borrador: true
---

> **Este caso describe un proyecto que estoy empezando, no uno terminado.** No
> hay código todavía. Está acá porque marca hacia dónde voy, y porque el
> problema que resuelve lo vi de primera mano.

## De dónde sale

Tres años entre [Set Logística](/proyectos/set-logistica/) y
[E-Techlog](/proyectos/etechlog/), en el mismo depósito. Dos empresas, dos
sistemas, y el mismo problema debajo de todo:

**Las reglas de inventario no estaban escritas en ningún lado.** Cuánto stock
mínimo tener de cada ítem, cada cuánto revisarlo, a partir de qué antigüedad un
ítem pasa a ser stock muerto, quién autoriza darlo de baja. Todo eso existía —
alguien lo sabía— pero vivía en la cabeza de esa persona y en su criterio del
día.

El ERP guardaba los movimientos. El CRM guardaba lo que el cliente pedía. Ningún
sistema guardaba **la política**, que es lo que conecta las dos cosas.

## Qué quiero construir

Una capa que se apoye en los datos que el ERP y el CRM ya tienen, y que agregue
lo único que falta: las reglas, escritas y versionadas.

- **Políticas explícitas por familia de ítem.** Punto de reposición, stock de
  seguridad, criterio de rotación, umbral de antigüedad. Cada regla con su
  fecha, su autor y su motivo.
- **Stock muerto detectado solo.** Por rotación y antigüedad contra la política,
  no contra la intuición. Con la valorización de lo inmovilizado al lado, que es
  lo que mueve a alguien a decidir.
- **Cruce con la demanda real.** El CRM sabe qué se pidió y qué se prometió; el
  ERP sabe qué había. La brecha entre las dos es donde se pierde plata, y hoy
  nadie la mira porque está repartida entre dos sistemas.
- **Una fuente de verdad por dato.** Cuando dos sistemas describen el mismo
  depósito, la pregunta no es cuál está bien: es cuál manda para qué campo. Esa
  decisión tiene que estar escrita en algún lado y hoy no lo está.

## La apuesta

La misma que hice con [PMI Toolbox](/proyectos/pmiproject/), y por la misma
razón. Ahí el problema era que la línea base se movía sola; acá es que la
política de inventario no existe como objeto. En los dos casos **la herramienta
no calcula nada que no se pueda calcular a mano: lo que aporta es no dejar que
la regla se mueva sin que se note.**

## Lo que falta

Todo. Este caso se va a ir llenando a medida que haya algo que mostrar.
