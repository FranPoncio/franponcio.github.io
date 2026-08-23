---
titulo: Bitácora Interior
resumen: PWA de escritura diaria que guarda todo en el dispositivo, dicta por voz y analiza cada día desde seis miradas distintas — con un camino gratis que no necesita ninguna clave de API.
categoria: herramienta
tramo: proyecto
orden: 7
periodo: 2025 — 2026
rol: Diseño y desarrollo
stack: ['PWA', 'React', 'TypeScript', 'Recharts', 'Vite', 'Web Speech API']
kpis:
  - label: Miradas por día
    valor: '6'
    nota: 'psicoanálisis, gestalt, TCC, logoterapia, simbólica y síntesis'
  - label: Backend propio
    valor: '0'
    nota: 'las entradas viven en localStorage, no hay servidor'
  - label: Bundle
    valor: 168 kB
    nota: 'gzip · 828 módulos en un solo chunk'
  - label: Ejes de vida
    valor: '9'
    nota: 'se eligen por día, no son fijos'
enlace:
  label: Ver la app
  url: https://bitacorainterior.netlify.app/
borrador: false
---

## El problema

Las apps de journaling que probé pedían cuenta, sincronizaban a un servidor
ajeno y guardaban texto personal en infraestructura de otro. Para un diario,
eso descalifica antes de mirar cualquier otra cosa.

Y las que no lo hacían se quedaban en el editor: escribís, guardás, y nunca más.
Un año de entradas es una serie temporal que generaste vos, y no hacer nada con
ella es desperdiciarla.

## Qué guarda un día

El día no es un campo de texto libre y nada más. Es un registro con forma, y
esa forma es la que después permite graficar:

```js
{ fecha, toma: false, ejes: [], intencion: '', animo: 5, agradecimiento: '',
  sueno: 5, alimentacion: 5, fisica: 5, meditacion: 0, reflexion: '' }
```

Cuatro escalas de 1 a 10 —ánimo, sueño, alimentación, actividad física—,
minutos de meditación, un booleano de adherencia, dos campos de texto
(agradecimiento y reflexión) y una intención con meta concreta. Los `ejes` son
las áreas que uno elige trabajar ese día, de nueve posibles: Salud, Trabajo,
Estudio, Formación, Familia, Pareja, Ocio, Física y Propósito.

La decisión de fondo: **lo cuantitativo y lo cualitativo en el mismo registro**.
Sin las escalas no hay gráfico; sin el texto no hay nada que analizar.

## Las decisiones

- **PWA y no app nativa.** Instalable desde el navegador, un solo código para
  escritorio y celular, sin pasar por ninguna tienda. El service worker
  precachea el shell y sirve *cache-first*, con `index.html` como fallback: si
  te quedás sin señal, la app abre igual.

- **`localStorage` y no IndexedDB.** Tres colecciones bajo el prefijo
  `bitacora:` — `entradas`, `analisis` y `tareas`. IndexedDB es más capaz, pero
  para unos cientos de entradas de texto es complejidad sin beneficio: la API
  síncrona de `localStorage` se lee de un renglón y no arrastra una capa de
  migraciones. Los `getItem`/`setItem` igual van envueltos en `try/catch`,
  porque en modo privado tiran excepción en vez de fallar en silencio.

- **Dictado por voz con la Web Speech API.** Escribir en el teclado del celular
  desalienta la entrada larga; dictando, cinco minutos de entrada se vuelven
  viables. Cuando el navegador no soporta la API el campo de texto sigue ahí y
  el mensaje lo dice sin vueltas — la función se degrada, no rompe.

## Seis miradas sobre el mismo día

Acá está lo que hace distinta a la app. Un análisis único de un día es una
opinión. Seis lecturas del mismo día, cada una con su marco declarado, es otra
cosa: se contradicen entre ellas, y esa contradicción es el contenido.

| Mirada | Qué busca |
|---|---|
| Psicoanálisis | lo que dice el inconsciente entre líneas |
| Gestáltica | el aquí y ahora, lo inconcluso |
| Cognitivo conductual | pensamientos, distorsiones y conductas |
| Logoterapia | el sentido, según Viktor Frankl |
| Perspectivas alternativas | lectura simbólica, explícitamente como juego |
| La síntesis | dos o tres oraciones que atan todo |

La quinta va marcada como juego dentro de la propia app, no como método. Y
abajo de todo, fijo: *"Espacio de reflexión personal — no reemplaza terapia ni
atención profesional."*

Del análisis salen **tareas**: una acción chica y concreta para el día
siguiente. No una recomendación genérica — algo que se pueda tachar.

## El camino gratis

La parte del diseño de la que estoy más conforme.

Analizar un día necesita un modelo de lenguaje, y eso normalmente significa
pedirle al usuario una clave de API o poner un backend con la clave propia
—que es exactamente el servidor ajeno que la app no quería tener—.

Hay dos caminos, y el que no cuesta nada es el que está primero:

1. **Gratis, sin clave.** La app arma el prompt con el día ya formateado, lo
   copiás, lo pegás en una conversación nueva de Claude y traés la respuesta de
   vuelta. Dos clicks más, cero infraestructura, cero costo.
2. **Con clave de Anthropic**, opcional, guardada en el mismo `localStorage`.
   Un botón y listo.

El copiar-y-pegar no es un parche por no haber podido hacer la integración:
es lo que mantiene la promesa de que la app no manda tu diario a ningún lado
sin que vos lo decidas, explícitamente, entrada por entrada.

## Lo que se ve de un año

Los gráficos son Recharts sobre las mismas entradas:

- **Ánimo y sueño de los últimos siete días**, con los días de toma marcados
  como puntos violetas encima de la serie. Puesto así, la adherencia deja de
  ser una lista y se vuelve algo que se cruza con cómo venías.
- **El equilibrio entre los cuatro ejes** —ánimo, sueño, comida, cuerpo—
  promediados, para ver cuál viene quedando atrás.

## Números del build

Vite 5.4.21, 828 módulos, **590,69 kB en un chunk único (168,11 kB gzip)** y un
`index.html` de 1,07 kB. Vite avisa que el chunk pasa los 500 kB y tiene razón:
partirlo con `import()` dinámico es lo primero de la lista, y la mayor parte es
Recharts, que sólo hace falta en la pantalla de gráficos.

El deploy va a Netlify desde un zip subido a mano: `npm run build`, publish
`dist`, sin repositorio conectado.
