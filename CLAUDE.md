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

## Estado actual (2026-08-05, cierre de sesión — postulaciones + F del Home)

- **`postulaciones/` es la carpeta de material dirigido** (CVs por empresa, cartas, textos de
  formularios y análisis de calce). **Está en `.gitignore` a propósito**: el repo es público y
  ahí hay expectativas de sueldo, nombres de reclutadores y dónde Fabián *no* tiene experiencia.
  Leer [postulaciones/README.md](./postulaciones/README.md) antes de tocar cualquier CV — trae
  el historial de las 4 postulaciones, los datos personales de verdad (IPLACEX en curso desde
  2026, Haulmer desde **2018**), las reglas (1 página A4, blanco y negro, lo que se cita en la
  carta debe estar en el CV) y el comando para regenerar los PDFs.
- **Los CVs dirigidos se hacen copiando la variante más cercana, nunca editando `CV_Fabian.html`**
  (ese es el del sitio). Tras editar cualquier CV hay que **verificar con captura headless**:
  la página A4 tiene `overflow: hidden` y recorta en silencio.
- **El CV del sitio quedó desactualizado**: `CV_Fabian.html` sigue diciendo "feb. 2019" en
  Haulmer (lo correcto es 2018) y no menciona IPLACEX. Corregirlo, regenerar
  `public/fabian-rubio-cv.pdf` y desplegar — pendiente de una sesión.
- **Ruby on Rails visible en el sitio** (`c96a3f5`, en producción): no aparecía en ninguna parte
  pese al RAG Pipeline en producción. Ahora está en skills (nivel 84), About y Skills (ES/EN),
  `knowsAbout` del JSON-LD, y el RAG pasó a ser el primer proyecto del Portfolio.
- **Fix de la F decorativa del Home** (`3aee0d6`, en producción): entre 1200 y 1750px (notebooks)
  la terminal la tapaba. Media query que la corre a `left: 47%` y la achica. Verificado con
  puppeteer-core en tiempo real a 1250/1496/1920px.
- **Herramienta útil**: hay un `check-overlap.js` (puppeteer-core) que mide solapes entre
  elementos del Home a un viewport dado; se rearma en 5 min si hace falta de nuevo. Recordar el
  gotcha: `--virtual-time-budget` NO adelanta las animaciones rAF de framer-motion.
- **PRIMER PENDIENTE DE LA PRÓXIMA SESIÓN — 10 alertas nuevas de Dependabot (9 high, 1 low).**
  Las 4 viejas de vite/esbuild **sí quedaron `fixed`**; estas son de otros paquetes y
  aparecieron después. Diagnóstico hecho el 2026-08-05:
  - **Root (5 high), todas de `devDependencies` — no llegan al navegador**: `sharp` (dep directa,
    procesamiento de imágenes en build), `immutable` (via `sass`), `postcss` (via `vite`),
    `fast-uri` (via `vite-plugin-pwa`), `brace-expansion` (transitiva de glob/filelist).
  - **`functions/` (1 high + 1 low)**: `brace-expansion` y `body-parser`.
  - `npm audit fix` resuelve casi todo; **`sharp` necesita `--force`** (0.34 → 0.35, salto mayor:
    verificar que el build de imágenes siga funcionando antes de dar por buena la subida).
  - Mismo patrón que la vez anterior: severidad alta pero superficie real baja (build-time).
    No cunde el pánico, pero conviene cerrarlas para que el repo público no muestre 9 high.

## Estado anterior (2026-07-15 — intro del Home + Vite 6)

- **Intro de AnimatedLetters del Home visible tras el boot**: el stagger corría desde
  el montaje tapado por el overlay del BootSequence (mismo bug que la F, `33ac460`).
  Fix: hook compartido `src/hooks/useBootDone.js` (extraído de HomeLogo) y remount del
  `h1` del título con `key` al llegar `boot:done` — AnimatedLetters no se tocó
  (invariante). Verificado con puppeteer-core + Chrome en tiempo real: primera visita,
  segunda visita (sin boot) y reduced-motion. **Gotcha de verificación**: el
  `--virtual-time-budget` de Chrome headless adelanta los timers pero NO las
  animaciones rAF de framer-motion — para verificar motion usar capturas en tiempo
  real (puppeteer), no virtual time. Desplegado y verificado en producción en vivo.
- **Vite 5 → 6.4.3 (con esbuild 0.25)**: cierra las 4 alertas de Dependabot del root
  (todas dev-only: bypass de `server.fs.deny` en Windows —high—, NTLMv2 vía
  launch-editor, path traversal en `.map`, y el CORS del dev server de esbuild).
  `npm audit` limpio en root y en `functions/`. Verificado: build idéntico, dev server
  y preview sin errores de consola. plugin-react 4.7 y vite-plugin-pwa 1.3 compatibles
  sin cambios de config. **Al cierre, las 4 alertas seguían "open" en GitHub** pese a
  que el grafo de dependencias ya registra vite 6.4.3/esbuild 0.25.12 — el auto-cierre
  es asíncrono y tardaba más de lo normal; verificar en la pestaña Dependabot que
  quedaron Closed (si siguieran abiertas días después, investigar).
  **Revisado el 2026-08-05: las 4 siguen "open"**, pero de nuestro lado está todo correcto —
  el SBOM del repo ya reporta `vite 6.4.3` / `esbuild 0.25.12`, el push está en `origin/main`
  y `npm ls --all` no muestra copias vulnerables anidadas. Es solo el auto-cierre de GitHub
  que no corre. Si molesta: desactivar y reactivar "Dependabot alerts" en Settings > Advanced
  Security fuerza un re-escaneo completo y las cerraría contra el lockfile actual.

- **Giro del sitio y CV hacia "Full Stack · Data & Backend"** para postulaciones activas
  (Junior Data Engineer en Grupo Mariposa; Vibe Coder en Zagged — ojo: Zagged exige
  apps publicadas en App Store, es su filtro duro), en producción y verificado en vivo:
  - Headline, meta tags, JSON-LD (`knowsAbout` con Python/SQL/PostgreSQL/Docker, sin
    `worksFor: Freelance`), textos de Home/About/Skills en ES y EN: "abierto a roles
    full-time y freelance".
  - **Acopia** (Python: pronóstico + optimización PV-BESS) y **Faro** (Go: ingesta CMF +
    API + dashboard, demo en faro.vibenest.net) en Portfolio, nueva categoría `data`
    (el RAG también se movió ahí). Descripción del RAG ahora dice multi-tenant y CI/CD
    (ojo: "134 tests" no se pudo verificar — se contaron 31 bloques; no se publicó cifra).
  - **CV regenerado** con el mismo giro; la sidebar de "Habilidades" (chips) se
    reemplazó por **Stack compacto (Data/Web/Ops/IA)** + **Resultados medibles**
    (−23% RMSE Acopia, p95<100ms Faro, miles de eventos/seg Atalaya, 60+ repos)
    (`dc55dc6`). Sigue siendo 1 página A4 — **verificar con screenshot headless tras
    cualquier edición**: el layout va justo y `overflow: hidden` recorta en silencio.
- **Pendientes de esta línea de trabajo**:
  - Captura visual de Acopia (lado usuario, "estos días") → agregarla a su tarjeta
    (`src/data/portfolio.js`, hoy `image: null`).
  - **Astilla para Zagged**: repo local en `ProyectosPortafolio/astilla` sin git ni
    GitHub; escaneado sin secretos (artifacts/ 314MB fuera). Falta el OK del usuario
    para: `git init` + `.gitignore` + repo público + tarjeta en Portfolio (idealmente
    con video demo — hay shorts terminados en `artifacts/`).
  - `og-cover.png` podría tener horneado el headline viejo ("Desarrollador Web Full
    Stack") — regenerarla antes de compartir el link en postulaciones.
  - El sitio es 100% JS para crawlers sin JS → AUD-003 (prerender, sesión propia).
- **`www.faborubio.dev` — sigue en 404, ya NO es propagación (acción lado usuario)**:
  el dominio se agregó en Firebase Console el 2026-07-12 y el certificado se emitió,
  pero el 2026-07-15 (3 días después) `curl -sIL https://www.faborubio.dev` seguía
  dando 404 "Site Not Found". Diagnóstico probable: quedó agregado como **dominio
  suelto** en vez de **redirect** → en Console (Hosting > dominios) borrarlo y
  re-agregarlo eligiendo "Redirect to existing website" → `faborubio.dev`. Éxito =
  301 → `faborubio.dev`.
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
  fleetpilot, veredicto, consola-transaccional, oteo, nexusroutine, telar, cauce
  (acopia y faro ya entraron; astilla pendiente de publicar).
- **El Método vive en** `\\wsl.localhost\Ubuntu-24.04\home\faborubio\Workspace\metodo\MANIFIESTO.md`
  (v1.1.0) — este repo lo sigue en dosis mínima; las fases de contenido cierran con su DoD.
- Deuda aceptada y su plan: [docs/AUDIT.md](./docs/AUDIT.md).

## Dónde vive cada cosa

- Textos: `src/locales/{es,en}/translation.json`
- Datos (skills/tips/proyectos): `src/data/portfolio.js`
- Tokens de diseño: `src/styles/_variables.scss`
- Formulario de contacto: front hace `POST /api/send` → Cloud Function
  (`functions/index.js`, Nodemailer + rate limit); rewrite en `firebase.json`
