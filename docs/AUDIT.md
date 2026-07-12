# AUDIT.md — Deuda técnica aceptada

> Todo trade-off aceptado tiene su `AUD-NNN`; una deuda sin registro es deuda invisible.
> Cada entrada: contexto, por qué se aceptó, y cómo/cuándo se paga. Se actualiza al aceptar
> o pagar un atajo.

| ID | Estado | Título |
|---|---|---|
| AUD-001 | Abierta | `MotionConfig reducedMotion="user"` global vs. reduced-motion quirúrgico en CSS |
| AUD-002 | Abierta | 5 "Opportunities" del motion audit sin implementar |
| AUD-003 | Abierta | El sitio renderiza 100% por JS: sin prerender estático para crawlers sin JS |

---

## AUD-001 — MotionConfig global vs. enfoque quirúrgico

**Contexto.** `src/App.jsx` envuelve toda la app en `<MotionConfig reducedMotion="user">`:
con "reducir movimiento" activo en el SO, framer-motion amortigua/omite **todas** sus
animaciones de transform — incluidas las interactivas one-shot como el pop de
AnimatedLetters. El CSS, en cambio, es deliberadamente quirúrgico
(`src/styles/index.scss`): solo apaga bucles ambientales infinitos y respeta lo
interactivo. Dos filosofías conviviendo; con reduced-motion activo en Windows, el sitio
se siente "apagado" aunque el CSS no lo pretenda.

**Por qué se aceptó.** No es un bug y el comportamiento actual es defendible en
accesibilidad (respetar la preferencia del usuario al máximo). Cambiarlo bien requiere
una discusión de criterio, no un parche. Diferido explícitamente a una sesión propia.

**Plan de pago.** Sesión dedicada a decidir: cambiar a `reducedMotion="never"` en
`MotionConfig` + aplicar `useReducedMotion()` selectivamente solo donde debe respetarse
(bucles, efectos vestibulares como el giro 3D de SpinF), espejando la filosofía del CSS.
No "arreglar" de pasada en otra tarea.

---

## AUD-002 — Opportunities del motion audit sin implementar

**Contexto.** El audit de motion (2026-06-15, reporte en `motion-audits/`, interno)
arrojó 11 hallazgos. Los 2 Critical y 4 Important se implementaron y desplegaron
(commit `db21c2b`). Las 5 "Opportunities" (mejoras menores, no defectos) quedaron fuera.

**Por qué se aceptó.** Proporcionalidad: eran refinamientos de bajo impacto y la sesión
priorizó cerrar lo crítico/importante con verificación visual.

**Plan de pago.** Oportunista — retomarlas del reporte si alguna sesión futura toca los
componentes afectados. Sin fecha; si el reporte se vuelve obsoleto frente al código,
cerrar esta entrada como descartada.

---

## AUD-003 — Sin prerender estático (SPA 100% JS)

**Contexto.** Sin JavaScript, el HTML servido solo contiene los metadatos y el JSON-LD:
un fetch simple no ve proyectos ni textos. Google ejecuta JS y el JSON-LD mitiga, pero
previews de ATS y crawlers de LLMs no ven el contenido real (detectado 2026-07-11
durante la preparación de postulaciones).

**Por qué se aceptó.** No bloquea las postulaciones en curso (el CV en PDF y el JSON-LD
cubren lo esencial) y un prerender bien hecho (vite-plugin-prerender o SSG parcial) es
una sesión propia, no un parche de pasada.

**Plan de pago.** Sesión dedicada: prerender estático del build de Vite (al menos rutas
y contenido de Portfolio/About). Verificar con `curl` que el HTML resultante contiene
los proyectos sin ejecutar JS.
