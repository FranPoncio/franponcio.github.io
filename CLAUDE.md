# franponcio.github.io — notas para Claude

Portfolio de Francisco Poncio. Astro 7 + Tailwind 4, estático, deploy a GitHub
Pages con cada push a `main`.

**Este archivo existe para que no tengas que redescubrir el repo cada sesión.**
Si algo de acá está desactualizado, corregilo en el momento: cuesta menos que
volver a explorar.

## Dónde está cada cosa

```
franponcioPage/          la app Astro (¡el proyecto NO está en la raíz!)
  src/components/        Home, Traza (la línea temporal), Fondo (canvas),
                         Planta (la escena del pie), Herramientas, Formacion
  src/lib/               herramientas.ts (el stack), proyectos.ts, url.ts
  src/pages/             index.astro, proyectos/[...id].astro, en/
  src/styles/global.css  TODOS los tokens de color, tipografía y acero
  src/content.config.ts  el esquema de las colecciones (leelo antes de tocar
                         cualquier frontmatter)
proyectos/<slug>/index.es.md   los casos. `.en.md` es opcional.
formacion/<slug>/index.md      un curso por carpeta, con su certificado al lado
```

## Comandos

```bash
cd franponcioPage
npm run build      # compila a dist/
npm test           # tests con el runner de Node, sin dependencias
npx astro check    # tipos
```

Para mirar el resultado: `python3 -m http.server 8099 --directory dist` y
Playwright desde `/opt/node22/lib/node_modules/playwright/index.mjs`
(no está instalado en el proyecto; se importa por ruta absoluta).

## Cómo trabajar acá sin quemar tokens

Esto importa: Francisco paga el consumo y las sesiones son largas.

- **No releas archivos enteros.** `grep -n` con contexto acotado, y `sed -n`
  del rango que vas a tocar. `Traza.astro` y `Fondo.astro` pasan las 900
  líneas.
- **Editá con `python3` + `str.replace` con `assert`**, no reescribiendo el
  archivo entero. Si el `assert` falla te enterás en el acto.
- **Un solo build al final**, no uno por cada micro-edición.
- **Capturá pantalla sólo si cambiaste algo visual**, y recortado
  (`clip`), no la página entera.
- **No bajes PDFs ni imágenes al contexto.** Cuando una herramienta guarda
  el resultado en disco, decodificalo con un script; no lo leas.
- Agrupá comandos independientes en una sola llamada.

## Convenciones

- **Todo en castellano**: nombres de variables, clases CSS, comentarios,
  mensajes de commit. Francisco escribe rioplatense; contestale igual.
- **Los comentarios explican POR QUÉ, no qué.** El repo está lleno de
  comentarios que cuentan qué se probó antes y por qué se descartó. Seguí esa
  línea: son la memoria del proyecto.
- **Frontmatter YAML: entrecomillá cualquier valor con `": "` adentro.** Un
  `resumen: PWA con una restricción: los datos...` sin comillas rompe el build
  entero y el error no dice qué archivo es. Ya pasó dos veces.
- `orden` en formación ordena DENTRO del estado (completado / cursando /
  planificado), no globalmente.
- Los tokens de color viven en `global.css`. No inventes colores sueltos.

## Movimiento y accesibilidad

El sitio respeta `prefers-reduced-motion`. Hay un interruptor en la barra que
lo pisa y guarda en `localStorage.mov`. **Si Francisco dice "no veo la
animación", casi siempre es esto**, no un bug.

- CSS: `:global(html:not([data-mov='on']))` para lo que no debe moverse.
- JS: `document.documentElement.dataset.mov !== 'on'`.
- Con reduce-motion activo, todo tiene que seguir siendo legible y completo,
  no desaparecer.

## Reglas de contenido que no se negocian

El repositorio es **público** y todo lo que entra queda en el historial de git
aunque después se borre.

1. **Nunca publicar el DNI.** Cuatro certificados lo traían y hubo que
   rasterizarlos y taparlo. Mirá toda imagen nueva antes de commitearla.
2. **Los datos operativos de gasoductos son del empleador, no de Francisco.**
   Se muestra el método, nunca cifras reales. Las de escala que ya están
   públicas en su perfil (12.000 km, 150 estaciones, 500 conexiones) sí.
3. **Procedimientos y certificados de SGI suelen ser del cliente.** Extracto,
   nunca el documento completo.
4. **No inventar cifras, entidades certificantes ni credenciales.** Si un dato
   no se puede respaldar, no va — o va marcado. Por eso `formacion/iso-trinorma`
   está `oculto: true`: falta la certificadora.
5. **No atribuirse una credencial que no se rindió.** El certificado de
   preparación para el CAPM es de Pearson y dice "Preparación para", no "CAPM".
6. **Nada de texto de normas ISO.** Numeración y título de cláusula son
   referencia factual; el texto es de ISO y se compra.

Si Francisco pide algo que choca con esto, decíselo en una o dos frases y
seguí con el resto. No lo bloquees, pero tampoco lo dejes pasar en silencio.

## Pendientes

- `set-logistica` afirma "Cero accidentes durante dos años consecutivos" con
  KPI `0`. **Sin respaldar.** Preguntado varias veces, sin respuesta todavía.
- Faltan traducciones al inglés de seis casos (`/en/` cae al español con aviso).
- Faltan fotos reales de gasoductos (hay 3 marcadores generados).
- Falta captura con datos sintéticos del tablero de EVM.
- `iso-trinorma`: falta entidad certificante y año.

## Aplicaciones

Los aplicativos **no viven acá**. El portfolio lleva el caso escrito y un link
que sale afuera; la app tiene su repo y su deploy. No volver a meter una app
adentro de `franponcioPage/src/pages/`.

| App | Repo | Vive en |
|---|---|---|
| SGI Trinorma | `FranPoncio/Trinorm_Sys` | https://franponcio.github.io/Trinorm_Sys/ |

Ojo: la carpeta del caso en el portfolio sigue siendo `proyectos/sgi-trinorma/`
y no se renombró — la URL del caso y el nombre del repo de la app son cosas
distintas y no tienen por qué coincidir.
