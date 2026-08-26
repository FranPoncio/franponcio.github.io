---
titulo: SGI Trinorma — cobertura y auditoría interna
resumen: "Un sistema que calcula qué requisitos de ISO 9001, 14001 y 45001 están realmente cubiertos por la evidencia de una organización, y arma el plan de auditoría interna a partir de eso."
categoria: gestion
tramo: proyecto
orden: 1
periodo: 2026 —
rol: Diseño y desarrollo
stack: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'TypeScript', 'Astro', 'Auditoría interna']
kpis:
  - label: Requisitos auditables
    valor: '45'
    nota: 'las tres normas, con el tronco común modelado una vez'
  - label: Preguntas de auditoría
    valor: '98'
    nota: 'escritas, no copiadas de la norma'
  - label: Motor
    valor: Determinístico
    nota: 'la IA redacta, no decide'
enlace:
  label: Ver la demostración
  url: https://franponcio.github.io/sgi/
borrador: true
---

> **Esto está en construcción.** El motor y el corpus de las tres normas están
> escritos y testeados, y hay una demostración que corre. Lo que falta —cargar
> evidencia propia, generar el informe redactado— está descrito más abajo como
> lo que es: pendiente.

## El problema que vi

Un sistema de gestión integrado se cae siempre por el mismo lado, y no es por
donde uno esperaría. No se cae porque falten procedimientos: se cae porque los
procedimientos existen y **nadie puede demostrar que se ejecutaron**.

La escena se repite. Llega la auditoría, alguien abre la carpeta, y ahí está el
procedimiento de capacitación, prolijo, firmado, versionado. El auditor no lo
mira más de tres segundos. Pregunta otra cosa: *¿cuándo fue la última
capacitación y quién la evaluó?* Y ahí aparece una planilla de hace diecinueve
meses.

Esa distancia —entre el documento que dice cómo se hace y el registro que
prueba que se hizo— es todo el problema. Y es un problema de datos: qué
evidencia tenés, a qué requisito sirve, y desde cuándo dejó de servir.

## Por qué no alcanza con una plantilla

Hay cien juegos de plantillas ISO dando vueltas y no resuelven nada, por una
razón sencilla: **el certificador no audita tus documentos, audita tu
sistema**. Un procedimiento perfecto para una empresa que no lo cumple no es
un ahorro, es un hallazgo mayor servido en bandeja. Documentación genérica que
no describe lo que la organización hace realmente es peor que no tenerla,
porque además demuestra que se copió.

Por eso este proyecto no genera plantillas. Lo que hace es más aburrido y más
útil: lleva la cuenta de la evidencia.

## Cómo funciona

Tres decisiones sostienen todo lo demás.

### El motor no usa IA

Decidir si un requisito está cubierto es una cuenta, no una opinión. La
función que lo hace recibe un requisito, la evidencia cargada y una fecha, y
devuelve el estado junto con el motivo y las evidencias que lo sostienen. Es
pura: mismos argumentos, mismo resultado, siempre. Está testeada con el runner
de Node, sin dependencias.

Esto no es purismo técnico. Es que cuando el auditor pregunte *¿por qué dice
68%?*, la respuesta tiene que ser una lista de evidencias con fecha. Un
sistema que contesta "lo calculó un modelo" no sirve para esto.

La IA entra después y en su lugar: redactar el informe sobre un resultado ya
calculado. Redacta, no decide.

### Vencido no es lo mismo que sin cubrir

El motor distingue cuatro estados, y dos de ellos suelen mezclarse:

| Estado | Qué significa |
|---|---|
| **Cubierto** | Toda la evidencia que el requisito pide existe y está vigente. |
| **Parcial** | Falta parte. Está el procedimiento pero no el registro, o al revés. |
| **Vencido** | Hay evidencia cargada, pero ninguna prueba ya nada por antigüedad. |
| **Sin cubrir** | No hay nada. |

Separar *vencido* de *sin cubrir* es deliberado. Que nunca hayas tenido un
procedimiento es una cosa. Que lo hayas tenido, lo hayas dejado morir y nadie
se haya dado cuenta habla del sistema entero — y el auditor lo lee exactamente
así. Son dos hallazgos distintos y merecen dos tratamientos distintos.

### Documento y registro son cosas distintas

Un documento dice cómo se hace algo: política, procedimiento, matriz. Se
revisa cada tanto pero no caduca por uso. Un registro prueba que algo *se
hizo*: acta, planilla firmada, informe. Tiene fecha y caduca.

El modelo los trata como tipos distintos y no acepta que uno reemplace al
otro. Tener el procedimiento de capacitación escrito no prueba que se haya
capacitado a nadie. Hay un test que garantiza justamente eso, porque es el
error que este sistema existe para evitar.

## Las tres normas de una, sin morir en el intento

Arrancar con la trinorma completa es el alcance que más proyectos mata. Acá se
sostiene por una razón concreta: las tres normas comparten la estructura de
alto nivel — capítulos 4 a 10, con los mismos títulos y la misma lógica. ISO
las armó así justamente para que se puedan integrar.

Ese tronco común se modela **una sola vez**:

- **21 requisitos de tronco**, que cubren las tres normas a la vez.
- **24 requisitos propios**: diseño y proveedores en calidad, aspectos
  ambientales y matriz legal en ambiente, peligros y participación de los
  trabajadores en seguridad.

Total: 45 requisitos auditables en lugar de los ~88 que costaría escribirlos
tres veces. Y no es sólo volumen: con tres corpus paralelos, a la tercera
corrección de redacción uno de los tres se queda atrás y nadie se entera.

## Lo que este repositorio no tiene

**No hay una sola línea del texto de las normas.** El texto de ISO 9001, 14001
y 45001 es propiedad de ISO y se compra. Un repositorio público con la 9001
copiada adentro se baja con un pedido de retiro, y con razón.

Lo que sí se usa es numeración y título de cláusula, que son referencia
factual y están publicados en todos lados. Todo lo demás —las 98 preguntas de
auditoría, las 88 descripciones de evidencia— está escrito desde el oficio.

Esto terminó jugando a favor. El valor de la herramienta nunca estuvo en el
texto de la norma, que cualquiera compra por cien dólares. Está en saber qué
preguntar y qué papel pedir, y eso no viene en la norma.

## La demostración

[La demo](/sgi/) evalúa el corpus contra **Metalúrgica del Suquía S.A.**, una
PyME cordobesa de 48 personas que no existe.

Está inventada por dos razones. La primera es que los datos de un SGI real
—una matriz de riesgos, un registro de incidentes— son del cliente o del
empleador, no míos, y no van a un repositorio público. La segunda es que una
demo con todo en verde no demuestra nada.

El estado está armado para que se vea lo que el motor distingue. Calidad va
adelante porque la empresa ya venía con 9001; ambiente va atrás; seguridad es
la más floja. Es el orden en que pasa en la vida real, y produce los hallazgos
que aparecen en cualquier PyME que integra tarde:

- **La participación de los trabajadores** (45001, 5.4) sin cubrir. Es la
  cláusula más simulada de la norma, porque es la única que no se resuelve
  con un documento.
- **La revisión por la dirección** vencida, no ausente: se hizo una vez y
  pasaron dieciséis meses.
- **Las matrices legales cargadas pero sin evaluación de cumplimiento.**
  Confundir una cosa con la otra es el error más frecuente en ambiente y en
  seguridad, y son dos requisitos separados.

Todo se calcula en tiempo de compilación: no hay servidor, no hay clave de
ningún modelo en el navegador. Como el motor es una función pura sobre datos
conocidos, el resultado se puede resolver antes de servir la página. Los
filtros sólo esconden lo que ya está en el HTML, así que con JavaScript
apagado se ve la lista completa.

## El porcentaje que no hay que malinterpretar

La demo muestra 78%, 69% y 68%. Ese número es **avance de implementación, no
cumplimiento**.

Para el certificador no existe el 78%. Un requisito no conforme es un
hallazgo, y alcanza uno mayor para no certificar. El porcentaje sirve para
saber cuánto falta y para ordenar el trabajo — no para tranquilizar a nadie, y
mucho menos para mostrárselo a un cliente como si fuera una nota.

Un requisito se cuenta cubierto sólo si **toda** la evidencia que pide tiene un
aporte vigente. No se promedia dentro del requisito: nueve papeles de diez no
es cumplir en un 90%, es no cumplir.

## Qué falta

Lo escribo como pendiente y no como característica, que es lo que es:

- **Cargar evidencia propia.** Hoy la evidencia es la de la empresa de
  demostración. Que una organización cargue la suya necesita un backend y
  autenticación, y eso ya no es un portfolio.
- **El informe redactado.** El plan de auditoría sale del motor; falta la capa
  que lo convierta en el documento que se firma y se entrega.
- **No conformidades y acciones correctivas.** Hoy el sistema detecta el
  hallazgo. Falta el ciclo completo: causa raíz, acción, verificación de
  eficacia.
- **Requisitos legales por jurisdicción.** Las matrices legales de ambiente y
  seguridad dependen de la provincia y del municipio. Eso no se resuelve con
  un corpus general.

## Por qué lo estoy haciendo

Me formé como auditor interno trinorma y lo que me quedó no fueron las
cláusulas: fue ver cuánto trabajo real se pierde en sostener el papeleo de un
sistema que igual no se puede demostrar. Gente competente, haciendo bien su
trabajo, sin forma de probarlo cuando llega el que pregunta.

Eso es un problema de trazabilidad de datos, no de redacción. Y es el mismo
problema que vengo resolviendo desde el otro lado — el de los datos — en todo
lo demás que hay en este portfolio.
