# Portafolio · Fabián Rubio

Portafolio personal **bilingüe (ES/EN)** hecho con **React + Vite**: single-page de scroll
con sidebar vertical, terminal interactiva, formulario de contacto funcional e **instalable
como PWA**.

🔗 **En vivo:** https://fabian-portafolio.web.app

Tema visual **Cyber-Humanist** (navy/obsidiana + cian + ámbar, glassmorphism, tipografía
Geist + JetBrains Mono). Especificación completa en [`DESIGN.md`](./DESIGN.md).

## Características

- **Terminal interactiva** en el Home: comandos reales (`help`, `about`, `skills`,
  `projects`, `contact`, `cv`, `social`) que navegan/descargan, historial con flechas y
  chips clicables. Easter eggs ocultos: `matrix` (lluvia Matrix), `theme` (cambia el tono),
  `sudo`.
- **Command palette** estilo VS Code (**Ctrl/⌘ + K**) para saltar a secciones y acciones.
- **Boot sequence**: preloader tipo terminal al cargar (una vez por sesión).
- **GitHub en vivo**: repos/seguidores/último repo reales vía API pública (sección Portfolio).
- **Skills interactivas**: esfera 3D (TagCloud) + barras de nivel; al señalar/tocar una tech
  se resalta en un "spotlight". Giro táctil en móvil.
- **Stats animados** en About (count-up al entrar en pantalla).
- **Animación de letras** en los títulos (hover en desktop, "ola" al deslizar en táctil) y
  **reveal** de secciones al hacer scroll (framer-motion).
- **PWA instalable** con actualización automática.
- **Accesible**: foco visible por teclado, skip-link y respeto a `prefers-reduced-motion`.
- **Analytics sin cookies** (GoatCounter).

## Stack

- **Vite 5** + **React 18**
- **react-i18next** + language detector — toggle ES/EN (sincroniza `<html lang>`)
- **framer-motion** — animaciones, reveal y `MotionConfig` (reduced-motion)
- **Sass (SCSS)** — estilos con tokens de diseño
- **Font Awesome** — iconos
- **Leaflet / react-leaflet** — mapa en Contact (cargado con `React.lazy`)
- **TagCloud** — esfera 3D de skills
- **vite-plugin-pwa** — manifest + service worker (autoUpdate)
- **Firebase** — Hosting + Cloud Function (Nodemailer) para el formulario
- **GoatCounter** — analytics privado

## Navegación

Single-page con scroll suave. El sidebar **sincroniza la URL con un hash** por sección
(`/#about`, `/#skills`, …) usando `history.pushState`/`replaceState`, soporta deep-links al
cargar (p. ej. `/#contact`) y los botones atrás/adelante. La raíz (`home`) queda sin hash.
No usa `react-router`. La lógica reutilizable vive en `src/utils/scrollToSection.js`.

Secciones: **Home · About · Skills · Método · Portfolio · Contact**
(la sección "Método" mantiene el id `tips`).

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

`node scripts/generate-pwa-icons.mjs` regenera los iconos del PWA desde `public/logo-f.png`.

## Estructura

```
src/
  components/   Layout, Sidebar, Footer, PageWrapper (reveal),
                AnimatedLetters + AnimatedTitle, HomeLogo, SpinF,
                Terminal, CommandPalette, BootSequence, GitHubStats,
                MatrixRain, ContactMap (lazy)
  pages/        Home, About, Skills, Tips, Portfolio, Contact
  locales/      es/ , en/  (translation.json)
  data/         portfolio.js  (skills con nivel, tips, proyectos)
  utils/        scrollToSection.js
  styles/       _variables, _animations, _buttons, index (SCSS)
  assets/img/   logos e imágenes (WebP optimizados)
functions/      index.js  (Cloud Function: email vía Nodemailer)
scripts/        generate-pwa-icons.mjs
public/         estáticos (CV, iconos PWA, og-cover, robots, sitemap)
_legacy/        portafolio estático anterior (referencia)
```

## Formulario de contacto

El front valida en cliente y hace `POST /api/send`. Ese endpoint es una **Cloud Function**
(`functions/index.js`) que reenvía el mensaje por email con **Nodemailer** (Gmail), con:

- Validación también en servidor.
- **Rate limiting** en memoria (3 envíos por IP/hora → responde `429`).
- Escapado de HTML para evitar inyección.

El rewrite `/api/send` → la función está definido en [`firebase.json`](./firebase.json).

Las credenciales son **secrets** de Firebase Functions (no van en el repo):

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_PASS   # contraseña de aplicación de Gmail
```

## PWA

`vite-plugin-pwa` en modo `autoUpdate` genera el manifest y el service worker. En
[`firebase.json`](./firebase.json), `sw.js` y `manifest.webmanifest` se sirven **sin caché**
para que la actualización automática llegue tras cada deploy; el resto de assets son
inmutables. El endpoint `/api/send` queda fuera del fallback del SW.

## Personalizar

- **Textos:** `src/locales/es/translation.json` y `en/translation.json`
- **Skills / Tips / Proyectos:** `src/data/portfolio.js` (los filtros del Portfolio y la
  esfera se derivan de aquí)
- **Colores y tipografías:** `src/styles/_variables.scss` (ver `DESIGN.md`)

## Deploy

Firebase Hosting (carpeta `dist`) + Functions:

```bash
npm run build
firebase deploy                 # hosting + functions
firebase deploy --only hosting  # solo el front
```
