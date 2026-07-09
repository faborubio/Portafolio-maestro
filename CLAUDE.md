# CLAUDE.md — Portafolio · Fabián Rubio

> Documento de reentrada: leer esto debe bastar para retomar el proyecto en 5 minutos,
> sin releer historiales de chat. Se actualiza al cerrar cada sesión que cambie el estado.
> Sigue el Método (proporcionalidad: este repo usa la dosis mínima — README + CLAUDE.md +
> AUDIT + DEPLOY; no hay SAD).

## Qué es

Portafolio personal bilingüe (ES/EN), single-page con React 18 + Vite 5 + framer-motion +
SCSS + i18next, instalable como PWA. Detalle de features, stack y estructura: [README.md](./README.md).
Sistema visual: [DESIGN.md](./DESIGN.md).

- **Producción:** https://faborubio.dev (Firebase Hosting; `fabian-portafolio.web.app`
  sigue activo como dominio por defecto del proyecto)
- **Repo:** https://github.com/faborubio/Portafolio-maestro (rama única `main`)

## Comandos

```bash
npm run dev        # dev server → http://localhost:5173
npm run build      # build de producción → dist/
npm run preview    # previsualizar el build
```

Deploy: ver [docs/DEPLOY.md](./docs/DEPLOY.md). Resumen: `npm run build` +
`npx firebase-tools deploy --only hosting` (la CLI de Firebase no está instalada global;
se usa vía npx). Si el deploy incluye functions, **siempre filtrado**:
`--only "hosting,functions:sendContactEmail"` — ver por qué en DEPLOY.md.

## Invariantes (no tocar sin decisión explícita)

- **AnimatedLetters**: no alterar el "feel" del pop/spring. Si algo necesita envolverlo,
  se envuelve — no se modifica el componente.
- **Reduced motion es quirúrgico en CSS**: el bloque `@media (prefers-reduced-motion: reduce)`
  de `src/styles/index.scss` solo apaga bucles ambientales infinitos; lo interactivo y los
  one-shot se mantienen. La tensión con el `MotionConfig` global es deuda registrada
  (AUD-001, ver [docs/AUDIT.md](./docs/AUDIT.md)) — no "arreglarla" de pasada.
- **La sección "Método" del sitio mantiene el id `tips`** (deep-links existentes).
- **CSP en `firebase.json`**: producción sirve una Content-Security-Policy ajustada a lo
  que el sitio usa (GoatCounter, Google Fonts, tiles OSM, api.github.com). Cualquier
  recurso externo nuevo (script, imagen, fetch, iframe) hay que añadirlo a la CSP o
  producción lo bloqueará en silencio.
- **La función `api` (us-central1) del proyecto Firebase NO es de este repo**: es el
  backend vivo de telar (`ProyectosPortafolio/telar`). El proyecto `fabian-portafolio`
  es compartido (aloja también atalaya-demo/live, mojitos-landing y telar-tejido).
  Nunca borrarla ni desplegar functions sin filtrar.

## Estado actual (2026-07-09, cierre de sesión — ciberseguridad)

- **Sesión de ciberseguridad completa, en producción y verificada** (`4a28f26`):
  - `functions/` con **0 vulnerabilidades** en `npm audit`: nodemailer 9,
    firebase-functions 6, runtime **Node 22**; `overrides` de firebase-admin/uuid
    (peer dependency que el código nunca importa — no quitar los overrides).
  - Función endurecida: la IP del rate limit sale del **penúltimo** `X-Forwarded-For`
    (el primero es falsificable) y el mapa se poda al superar 500 entradas.
  - **Headers de seguridad en Hosting** (`firebase.json`): CSP completa, X-Frame-Options,
    nosniff, Referrer-Policy, Permissions-Policy, HSTS. Verificados en vivo con curl y
    render headless (la app monta entera bajo la CSP, mapa Leaflet incluido).
- **Descubrimiento clave**: el proyecto Firebase es compartido con telar/atalaya/mojitos
  (ver Invariantes y DEPLOY.md). La función `api` es de telar y corre **Node 20
  deprecado** (se apaga 2026-10-30) — subirla a 22 desde el repo telar en alguna sesión.
- **Dominio `faborubio.dev` activo y migrado** (`942c9c1`), registrado en Google Search
  Console (sitemap enviado, indexación solicitada).
- **Pendiente que se resuelve solo**: el certificado de `www.faborubio.dev` seguía en
  emisión al cierre anterior — Firebase lo completa y redirige al apex. Si en días sigue
  caído, revisar Firebase Console → Hosting.
- **Pendiente menor (lado usuario)**: actualizar el dominio en los settings de
  GoatCounter (`faborubio.goatcounter.com`).
- Fixes del motion audit (2 Critical + 4 Important) en producción (`db21c2b`); reporte en
  `motion-audits/` (untracked, interno). Las 5 "Opportunities" → AUD-002.
- Fix del dibujo de la F tras el boot (`33ac460`); Atalaya en Portfolio (nueva categoría
  `fullstack`, captura de la demo viva) y CV con certificaciones SENCE + badge IBM/Credly
  + sección de proyectos destacados (`0aa9a3b`).
- El CV del sitio es `public/fabian-rubio-cv.pdf`, **generado desde `CV_Fabian.html`**
  (Chrome headless / Ctrl+P con gráficos de fondo) — al editar el HTML hay que
  regenerarlo. El HTML es una página A4 de altura fija (`overflow: hidden`): verificar
  que el contenido no se recorte tras editar.
- **Candidatos a futuros proyectos del Portfolio** (repos públicos con buena descripción):
  fleetpilot, veredicto, acopia, consola-transaccional, oteo, nexusroutine, telar, cauce.
- Deuda aceptada y su plan: [docs/AUDIT.md](./docs/AUDIT.md).

## Dónde vive cada cosa

- Textos: `src/locales/{es,en}/translation.json`
- Datos (skills/tips/proyectos): `src/data/portfolio.js`
- Tokens de diseño: `src/styles/_variables.scss`
- Formulario de contacto: front hace `POST /api/send` → Cloud Function
  (`functions/index.js`, Nodemailer + rate limit); rewrite en `firebase.json`
