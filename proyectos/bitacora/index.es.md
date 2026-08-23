---
titulo: Bitácora Interior
resumen: Progressive web app para escritura diaria — dictado por voz, entradas estructuradas y visualización de los propios datos a lo largo del tiempo.
categoria: herramienta
tramo: proyecto
orden: 7
periodo: 2025 — 2026
rol: Diseño y desarrollo
stack: ['PWA', 'React', 'TypeScript', 'Web Speech API']
kpis:
  - label: Tipo
    valor: PWA
    nota: 'instalable, funciona offline'
  - label: Entrada
    valor: Voz
    nota: 'dictado en el navegador'
  - label: Datos
    valor: Local
    nota: 'nunca salen del dispositivo'
borrador: true
---

> **Texto de relleno.** Reemplazalo por lo tuyo.

## El problema

Las apps de journaling que probé pedían cuenta, sincronizaban a un servidor
ajeno y guardaban texto personal en infraestructura de otro. Para lo que es un
diario, eso descalifica antes de evaluar cualquier otra cosa.

## Las decisiones

- **PWA y no app nativa.** Instalable desde el navegador, funciona sin conexión,
  un solo código para escritorio y celular, sin pasar por ninguna tienda.

- **Dictado por voz con la Web Speech API.** Escribir en el teclado del celular
  desalienta la entrada larga. Con dictado, una entrada de cinco minutos se
  vuelve viable. Cuando el navegador no soporta la API, el campo de texto sigue
  ahí — la función se degrada, no rompe.

- **Los datos no salen del dispositivo.** Sin cuenta, sin backend, sin
  analytics. Es la decisión que define el producto: la exportación es
  responsabilidad del usuario, y eso es a propósito.

## El ángulo de datos

La parte que rescata este proyecto para un portfolio técnico no es el editor:
es **qué se puede leer de un año de escritura propia**. Frecuencia, extensión,
recurrencia de temas, variación estacional. Un diario es una serie temporal que
uno mismo generó, y visualizarla es trabajo de datos igual que cualquier otro
— con la ventaja de que conocés el dominio mejor que nadie.
