---
titulo: Sistema de gestión trinorma — Set Logística SRL
resumen: Implementación, certificación y recertificación de ISO 9001, 14001 y 45001 sobre una operación logística, con el ERP como columna vertebral del sistema.
categoria: gestion
orden: 3
periodo: 2013 — 2015
rol: Project Manager · Business Analyst · Data Analyst
stack: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ERP', 'SQL', 'Power BI', 'Tableau']
kpis:
  - label: Accidentes
    valor: '0'
    nota: 'dos años consecutivos'
  - label: Reclamos
    valor: '−40 %'
    nota: 'interanual'
  - label: Normas
    valor: '3'
    nota: 'calidad, ambiente y S&SO'
  - label: Ciclos
    valor: 'Cert. + recert.'
    nota: 'auditoría externa superada dos veces'
---

## El contexto

Set Logística SRL opera desde el mismo depósito que E-Techlog — dos empresas,
una instalación compartida. Mi foco acá fue el **sistema de gestión integrado**
y el ERP que lo sostiene.

## El problema

Un sistema certificado y una operación real tienden a divorciarse. El
procedimiento dice una cosa, el operario hace otra, y la carpeta se actualiza la
semana antes de la auditoría. Cuando eso pasa, la certificación es un costo
administrativo que no mejora nada.

El desafío no era certificar. Era **certificar algo que la gente usara todos los
días**.

## Qué hice

### El sistema trinorma

Implementación y certificación de **ISO 9001, 14001 y 45001** integradas, más el
ciclo completo de **recertificación** — que es la prueba real: sostener el
sistema cuando ya no está la presión de la primera auditoría.

Integrar las tres comparte la documentación y el ciclo de auditoría, pero obliga
a resolver los puntos donde se pisan. El más claro es el riesgo: calidad mira el
incumplimiento al cliente, ambiente mira el impacto, y seguridad mira el daño a
las personas. Son tres lecturas del mismo hecho, y forzarlas a una matriz única
las vuelve inútiles.

La certificación se manejó **como proyecto**: alcance, cronograma, responsables e
hitos hasta la auditoría externa.

### El ERP como columna vertebral

La decisión que sostuvo todo: **los registros del sistema de gestión salen del
ERP, no de planillas paralelas**. Si el operario ya carga el movimiento para
operar, ese mismo dato es la evidencia de la auditoría.

Eso es lo que evita el divorcio. No hay que "completar los registros" antes de la
auditoría porque los registros son subproducto del trabajo.

### No conformidades

Gestión del ciclo completo: detección, análisis de causa raíz, acción correctiva
y verificación de eficacia. La parte que más cuesta no es levantar la no
conformidad — es **verificar meses después que la acción funcionó** y no volvió a
pasar.

### Los indicadores

El sistema no se sostiene con la carpeta: se sostiene con lo que se mide. Armé
los tableros que seguían la operación —no conformidades abiertas y cerradas,
tiempos de respuesta, incidentes, reclamos por cliente y por causa— consultando
directamente contra la base del ERP con **SQL**, y publicando en **Power BI** y
**Tableau**.

Eso es lo que convirtió la revisión por la dirección en una reunión útil: se
entra con los números arriba de la mesa, no con un relato.

Y es donde empieza el hilo que sigue hasta hoy — **el trabajo de datos no arrancó
en la infraestructura de gas, arrancó acá, en 2013**.

## Resultado

- **Cero accidentes durante dos años consecutivos.** En una operación de depósito
  —montacargas, altura, movimiento constante— eso no sale de un cartel: sale de
  que el procedimiento y la práctica coinciden.
- **Reclamos de clientes reducidos un 40 % interanual.**
- Certificación y recertificación de las tres normas superadas.

## Lo que me llevé

Que un sistema de gestión sirve o estorba según una sola decisión: **de dónde
salen los registros**. Si salen del trabajo, el sistema mejora la operación. Si
salen de una planilla aparte, es burocracia con sello.
