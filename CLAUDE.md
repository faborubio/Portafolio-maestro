# CLAUDE.md — Portafolio · Fabián Rubio

> Documento de reentrada: leer esto debe bastar para retomar el proyecto en 5 minutos,
> sin releer historiales de chat. Se actualiza al cerrar cada sesión que cambie el estado.
> Sigue el Método (proporcionalidad: este repo usa la dosis mínima — README + CLAUDE.md +
> AUDIT + DEPLOY; no hay SAD).

## Qué es

Portafolio personal bilingüe (ES/EN), single-page con React 18 + Vite 5 + framer-motion +
SCSS + i18next, instalable como PWA. Detalle de features, stack y estructura: [README.md](./README.md).
Sistema visual: [DESIGN.md](./DESIGN.md).

- **Producción:** https://fabian-portafolio.web.app (Firebase Hosting)
- **Dominio propio:** `faborubio.dev` (Namecheap) — en migración, ver "Estado actual"
- **Repo:** https://github.com/faborubio/Portafolio-maestro (rama única `main`)

## Comandos

```bash
npm run dev        # dev server → http://localhost:5173
npm run build      # build de producción → dist/
npm run preview    # previsualizar el build
```

Deploy: ver [docs/DEPLOY.md](./docs/DEPLOY.md). Resumen: `npm run build` +
`npx firebase-tools deploy --only hosting` (la CLI de Firebase no está instalada global;
se usa vía npx).

## Invariantes (no tocar sin decisión explícita)

- **AnimatedLetters**: no alterar el "feel" del pop/spring. Si algo necesita envolverlo,
  se envuelve — no se modifica el componente.
- **Reduced motion es quirúrgico en CSS**: el bloque `@media (prefers-reduced-motion: reduce)`
  de `src/styles/index.scss` solo apaga bucles ambientales infinitos; lo interactivo y los
  one-shot se mantienen. La tensión con el `MotionConfig` global es deuda registrada
  (AUD-001, ver [docs/AUDIT.md](./docs/AUDIT.md)) — no "arreglarla" de pasada.
- **La sección "Método" del sitio mantiene el id `tips`** (deep-links existentes).

## Estado actual (2026-07-08)

- Fixes del motion audit (2 Critical + 4 Important) implementados, desplegados y en
  producción (commit `db21c2b`). El reporte del audit vive en `motion-audits/` (untracked,
  interno). Las 5 "Opportunities" del reporte quedaron sin implementar → AUD-002.
- **Dominio `faborubio.dev` en migración**: DNS en Namecheap ya apunta a Firebase
  (A `@` y `www` → `199.36.158.100`, TXT `hosting-site=fabian-portafolio`). Pendiente:
  esperar el certificado SSL de Firebase y luego **actualizar las 12 URLs hardcodeadas**
  a `fabian-portafolio.web.app` (index.html canonical/OG/JSON-LD, public/robots.txt,
  public/sitemap.xml, README.md, src/data/portfolio.js, CV_Fabian.html,
  og-cover-generator.html) + build + deploy.
- Deuda aceptada y su plan: [docs/AUDIT.md](./docs/AUDIT.md).

## Dónde vive cada cosa

- Textos: `src/locales/{es,en}/translation.json`
- Datos (skills/tips/proyectos): `src/data/portfolio.js`
- Tokens de diseño: `src/styles/_variables.scss`
- Formulario de contacto: front hace `POST /api/send` → Cloud Function
  (`functions/index.js`, Nodemailer + rate limit); rewrite en `firebase.json`
