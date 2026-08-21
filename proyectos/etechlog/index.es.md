---
titulo: Gestión de inventario y operación — E-Techlog SA
resumen: Análisis integral de la operación de depósito con SAP y ERP — reducción de stock muerto, exactitud de inventario y gestión de seguridad y ambiente.
categoria: datos
orden: 3
periodo: '[2021 — 2023]'
rol: '[Gestión de inventario y mejora de la operación]'
stack: ['SAP', 'ERP', 'Gestión de inventario', 'ISO 14001', 'ISO 45001']
kpis:
  - label: Stock muerto
    valor: '[−X %]'
    nota: 'sobre el valor inmovilizado'
  - label: Exactitud
    valor: '[X %]'
    nota: 'sistema contra depósito'
  - label: Alcance
    valor: 'Operación completa'
    nota: 'de recepción a despacho'
borrador: true
---

> **Faltan los porcentajes.** Poné los que tengas — el de stock muerto es el que
> más peso tiene.

## El contexto

E-Techlog SA comparte depósito con Set Logística. Si allá el foco fue el sistema
de gestión, acá fue **el inventario y la operación**: qué hay, dónde está, cuánto
vale y qué está frenado.

## El problema

El stock muerto no aparece en ningún tablero hasta que alguien lo busca. No
genera un error, no dispara una alarma: simplemente ocupa lugar, inmoviliza
capital y envejece. Y como cada movimiento individual es correcto, el sistema
nunca se queja.

Lo mismo con la exactitud de inventario. Nadie reporta que el stock del sistema y
el del depósito difieren — se descubre cuando falta algo para despachar, que es
el peor momento posible.

## Qué hice

### Análisis de la operación completa

De recepción a despacho, siguiendo el recorrido real de la mercadería y no el
organigrama. Ahí aparecen las cosas que ningún indicador aislado muestra: dónde
se acumula, dónde se toca de más, qué se mueve dos veces porque quedó mal ubicado.

### SAP y ERP

Trabajo sobre los datos de los dos sistemas para responder preguntas que ninguno
contestaba solo. **La decisión de fondo: definir cuál es la fuente de verdad para
cada dato.** Cuando dos sistemas describen el mismo depósito, la pregunta no es
cuál está bien — es cuál manda para qué.

### Stock muerto

Identificación por rotación y antigüedad, valorización de lo inmovilizado, y el
circuito para decidir qué hacer con cada ítem. La parte técnica es la más fácil;
lo que cuesta es **que alguien se haga cargo de la decisión**, porque dar de baja
stock es reconocer una compra que no sirvió.

### Seguridad y ambiente

Gestión de los requisitos de **ISO 45001 y 14001** en el piso: residuos,
elementos de protección, condiciones de trabajo en el depósito. En una operación
donde conviven dos empresas en la misma instalación, esto tiene una vuelta extra:
las responsabilidades se cruzan y hay que dejarlas escritas.

## Resultado

- **Reducción del stock muerto** en **[X %]** sobre el valor inmovilizado.
- **[Completar]** exactitud de inventario alcanzada.
- La operación analizada de punta a punta, con los cuellos identificados y
  medidos.

## Lo que me llevé

Que la exactitud de inventario es el cimiento de todo lo demás. Se puede tener el
mejor tablero, el mejor ERP y el mejor procedimiento — **si el stock del sistema
no coincide con el del depósito, ninguno vale nada.**
