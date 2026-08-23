---
titulo: Bitácora Interior
resumen: 'PWA de escritura diaria construida alrededor de una restricción: los datos son sensibles y no salen del dispositivo. Sin cuenta, sin backend y con el envío a un modelo de lenguaje puesto en manos del usuario, entrada por entrada.'
categoria: herramienta
tramo: proyecto
orden: 7
periodo: 2025 — 2026
rol: Diseño y desarrollo
stack: ['PWA', 'React', 'TypeScript', 'Recharts', 'Vite', 'Web Speech API']
kpis:
  - label: Datos que salen
    valor: '0'
    nota: 'sin cuenta, sin analytics, sin sincronización'
  - label: Backend propio
    valor: '0'
    nota: 'las entradas viven en localStorage, no hay servidor'
  - label: Bundle
    valor: 168 kB
    nota: 'gzip · 828 módulos en un solo chunk'
  - label: Lecturas por entrada
    valor: '6'
    nota: 'seis marcos distintos sobre el mismo texto'
enlace:
  label: Ver la app
  url: https://bitacorainterior.netlify.app/
borrador: false
---

## El problema

Un diario es el caso difícil del dato personal: alto valor para quien lo
escribe, nulo para cualquier otro, y daño real si se filtra. Las apps de
journaling que probé pedían cuenta, sincronizaban a un servidor ajeno y
guardaban ese texto en infraestructura de otro. Para lo que es, eso descalifica
antes de mirar cualquier otra cosa.

Y las que no lo hacían se quedaban en el editor: escribís, guardás, y nunca
más. Un año de entradas es una serie temporal que generaste vos, y no hacer
nada con ella es desperdiciarla.

El proyecto es el cruce de esas dos cosas: **sacarle información a un dato
sensible sin moverlo de lugar**.

## Qué guarda un día

El día no es un campo de texto libre y nada más. Es un registro con forma, y esa
forma es la que después permite graficar:

```js
{ fecha, toma: false, ejes: [], intencion: '', animo: 5, agradecimiento: '',
  sueno: 5, alimentacion: 5, fisica: 5, meditacion: 0, reflexion: '' }
```

Cuatro escalas de 1 a 10 —ánimo, sueño, alimentación, actividad física—,
minutos de meditación, un marcador binario del día, dos campos de texto y una
intención con meta concreta. Los `ejes` son las áreas que uno elige trabajar ese
día, de nueve posibles: Salud, Trabajo, Estudio, Formación, Familia, Pareja,
Ocio, Física y Propósito.

La decisión de fondo: **lo cuantitativo y lo cualitativo en el mismo registro**.
Sin las escalas no hay gráfico; sin el texto no hay nada que interpretar.

## Gestionar un dato que no puede salir

Acá está lo que hace interesante al proyecto desde el lado de datos. La
restricción —nada sale del dispositivo— no es una preferencia estética: es lo
que define toda la arquitectura.

- **Sin cuenta y sin backend.** No hay a quién pedirle permiso ni a quién
  reclamarle una filtración, porque no hay dónde. La exportación es
  responsabilidad de quien escribe, y eso es a propósito.

- **`localStorage`, no IndexedDB.** Tres colecciones bajo el prefijo
  `bitacora:` — `entradas`, `analisis` y `tareas`. IndexedDB es más capaz, pero
  para unos cientos de entradas de texto es complejidad sin beneficio: la API
  síncrona se lee de un renglón y no arrastra una capa de migraciones. Los
  `getItem`/`setItem` van igual envueltos en `try/catch`, porque en modo privado
  tiran excepción en vez de fallar en silencio.

- **Sin analytics.** Ni un evento. En una app así, medir el uso es exactamente
  la clase de cosa que uno no quiere que exista.

- **PWA y no app nativa.** Instalable desde el navegador, un solo código para
  escritorio y celular, sin pasar por ninguna tienda ni por su telemetría. El
  service worker precachea el shell y sirve *cache-first*, con `index.html` de
  fallback: sin señal, la app abre igual.

- **Dictado por voz con la Web Speech API.** Escribir en el teclado del celular
  desalienta la entrada larga. Cuando el navegador no soporta la API el campo de
  texto sigue ahí y el mensaje lo dice sin vueltas — la función se degrada, no
  rompe.

## El consentimiento es el diseño

El punto donde la restricción se pone difícil: interpretar una entrada necesita
un modelo de lenguaje, y eso normalmente significa pedir una clave de API o
poner un backend con la clave propia — que es exactamente el servidor ajeno que
la app no quería tener.

Hay dos caminos, y el que no cuesta nada está primero:

1. **Sin clave.** La app arma el prompt con la entrada ya formateada, lo copiás,
   lo pegás en una conversación aparte y traés la respuesta de vuelta. Dos
   clicks más, cero infraestructura, cero costo.
2. **Con clave de Anthropic**, opcional, guardada en el mismo `localStorage`.

El copiar-y-pegar no es un parche por no haber podido hacer la integración: es
**el mecanismo de consentimiento**. Nada se envía a ningún lado por defecto, y
cada envío es un acto deliberado sobre una entrada puntual — no un permiso
general que se otorga una vez al instalar y después se olvida.

## Seis lecturas del mismo texto

Del lado del producto, la decisión que más me gusta: en vez de un análisis
único, la app produce **seis lecturas del mismo texto**, cada una con su marco
declarado —psicoanálisis, gestáltica, cognitivo conductual, logoterapia, una
lectura simbólica marcada explícitamente como juego, y una síntesis final—.

Un análisis único se lee como veredicto. Seis que se contradicen entre sí se
leen como lo que son: interpretaciones. Que el marco esté nombrado en cada una
es lo que le devuelve al lector la decisión de qué hacer con eso. La app aclara
abajo de todo que es un espacio de reflexión y no reemplaza atención
profesional.

De ahí salen **tareas**: una acción chica y concreta para el día siguiente. Algo
que se pueda tachar, no una recomendación genérica.

## Lo que se ve de un año

Los gráficos son Recharts sobre las mismas entradas, sin ningún procesamiento
que salga del navegador:

- **Las series de ánimo y sueño de los últimos siete días**, con el marcador
  binario del día superpuesto — que es lo que convierte una lista de casilleros
  en algo que se cruza con cómo venías.
- **El equilibrio entre los cuatro ejes** —ánimo, sueño, comida, cuerpo—
  promediados, para ver cuál viene quedando atrás.

## Números del build

Vite 5.4.21, 828 módulos, **590,69 kB en un chunk único (168,11 kB gzip)** y un
`index.html` de 1,07 kB. Vite avisa que el chunk pasa los 500 kB y tiene razón:
partirlo con `import()` dinámico es lo primero de la lista, y la mayor parte es
Recharts, que sólo hace falta en la pantalla de gráficos.

El deploy va a Netlify desde un zip subido a mano: `npm run build`, publish
`dist`, sin repositorio conectado.
