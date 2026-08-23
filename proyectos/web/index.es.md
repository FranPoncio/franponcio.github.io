---
titulo: Este portfolio
resumen: El sitio que estás leyendo — Astro con el contenido afuera del código, para que agregar un caso sea crear una carpeta con un archivo de texto adentro.
categoria: herramienta
tramo: proyecto
orden: 3
periodo: '2026'
rol: Diseño, desarrollo y contenido
stack: ['Astro', 'TypeScript', 'Tailwind', 'GitHub Actions']
kpis:
  - label: JavaScript
    valor: '2,6 KB'
    nota: 'en el home, sin framework en el cliente'
  - label: Páginas
    valor: '22'
    nota: '11 por idioma'
  - label: Dependencias
    valor: '0'
    nota: 'pedidos a servicios externos'
  - label: Deploy
    valor: Automático
    nota: 'cada push a main'
enlace:
  label: Ver el código
  url: https://github.com/FranPoncio/franponcio.github.io
---

## La decisión que ordena todo

**El contenido vive afuera del proyecto Astro.** Los casos están en
`proyectos/`, los cursos en `formacion/`, y el sitio en otra carpeta que los
levanta con el loader de contenido.

Suena a detalle y no lo es: para escribir un caso no hace falta entrar al
código ni saber Astro. Se crea una carpeta con un `.md` adentro y sus imágenes
al lado, y el home lo levanta solo. Es la diferencia entre un sitio que puedo
mantener y uno que voy a abandonar.

## Un esquema que rompe a tiempo

Cada caso valida contra un esquema. Si falta un campo obligatorio, o una imagen
va sin texto alternativo, **el build falla y dice cuál**. Es a propósito:
prefiero que rompa al compilar y no que se publique a medias.

Lo mismo con los dos idiomas. Los textos de interfaz están tipados: si agrego
una clave en español y me la olvido en inglés, TypeScript lo marca antes de
publicar. Si falta la traducción de un caso, la página en inglés muestra el
español con un aviso, en vez de un 404 o un hueco.

## Casi nada de JavaScript

El home sirve **2,6 KB** de JavaScript, y no hay framework en el cliente. Todo
lo que se mueve —la traza que se recorre de costado, el gas que llena el caño,
las cifras que cuentan— corre sobre una variable de CSS que el script actualiza
en cada frame de scroll. El resto lo resuelve el compositor: ni `transform` ni
`clip-path` recalculan layout.

Y todo degrada. Sin JavaScript la página se ve igual, sólo que quieta. Con
`prefers-reduced-motion` no se mueve nada.

## Sin pedidos a terceros

Las tipografías viajan en el repo, no se bajan de Google Fonts. Los logos de las
herramientas se incrustan durante el build. **El sitio no le informa a nadie
quién lo visita**, y no depende de que un CDN ajeno siga en pie.

## Deploy

Cada push a `main` dispara una GitHub Action que compila y publica. No hay paso
manual, y por eso tampoco hay forma de que lo publicado y el repo se
desincronicen.

## Lo que me llevé

Que la pregunta útil al armar una herramienta propia no es qué puede hacer, sino
**qué tan barato es el gesto que voy a repetir mil veces.** Acá ese gesto es
escribir un archivo de texto. Todo lo demás está subordinado a eso.
