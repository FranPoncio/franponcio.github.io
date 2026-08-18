---
titulo: Bitácora Interior
resumen: Progressive web app para escritura diaria — dictado por voz, entradas estructuradas y visualización de los datos propios.
categoria: herramienta
orden: 6
periodo: '[2025 — 2026]'
rol: Diseño y desarrollo
stack: ['PWA', 'React', 'TypeScript', 'Web Speech API']
kpis:
  - label: Tipo
    valor: 'PWA'
    nota: 'instalable, funciona offline'
  - label: Entrada
    valor: 'Voz'
    nota: 'dictado en el navegador'
borrador: true
---

> **Plantilla.** Y una opinión que te debo: para un puesto de ingeniería/datos
> este proyecto manda **señal más floja** que los de gasoductos o EVM. Es
> personal y el evaluador no puede juzgar el dominio. Yo lo dejaría, pero abajo
> de los otros — que es justo lo que hace `orden: 6`.

## El problema

Qué te faltaba de las apps de journaling que ya existen.

## Las decisiones

- **Por qué PWA y no app nativa.** Instalable, sin tiendas, un solo código.
- **Dictado por voz.** Qué API usaste y qué pasa cuando el navegador no la
  soporta.
- **Dónde viven los datos.** Si es un diario personal, esto es lo primero que
  alguien va a preguntar. Contestalo explícito.

## La parte interesante para un portfolio de datos

Visualizar tus propias entradas es el ángulo que rescata este proyecto: ¿qué se
puede leer de un año de escritura? Eso sí es trabajo de datos.
