# Portafolio · Fabián Rubio

Portafolio personal **bilingüe (ES/EN)** hecho con **React + Vite**. Single-page de scroll
con sidebar vertical de 6 secciones, animaciones y un formulario de contacto funcional.

🔗 **En vivo:** https://fabian-portafolio.web.app

Tema visual **Cyber-Humanist** (navy/obsidiana + cian + ámbar, glassmorphism, tipografía
Geist + JetBrains Mono). Especificación completa en [`DESIGN.md`](./DESIGN.md).

## Stack

- **Vite 5** + **React 18**
- **react-i18next** + language detector — toggle ES/EN
- **framer-motion** — animaciones y transiciones
- **Sass (SCSS)** — estilos con tokens de diseño
- **Font Awesome** — iconos de navegación y sociales
- **Leaflet / react-leaflet** — mapa en la sección Contact
- **TagCloud** — esfera 3D de skills
- **Firebase** — Hosting + Cloud Function (Nodemailer) para el formulario

## Navegación

Single-page con scroll suave. El sidebar **sincroniza la URL con un hash** por sección
(`/#about`, `/#skills`, …) usando `history.pushState`/`replaceState`, soporta deep-links
al cargar (p. ej. `/#contact`) y los botones atrás/adelante del navegador. La raíz
(`home`) queda sin hash. No usa `react-router`.

Secciones: **Home · About · Skills · Tips · Portfolio · Contact**

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  components/   Layout, Sidebar, Footer, HomeLogo, SpinF,
                AnimatedLetters, ContactMap, PageWrapper
  pages/        Home, About, Skills, Tips, Portfolio, Contact
  locales/      es/ , en/  (translation.json)
  data/         portfolio.js  (skills, tips, proyectos)
  styles/       _variables, _animations, _buttons, index (SCSS)
  assets/img/   logos e imágenes
functions/      index.js  (Cloud Function: envío de email vía Nodemailer)
public/         estáticos servidos tal cual (CV, og-cover, etc.)
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

## Personalizar

- **Textos:** `src/locales/es/translation.json` y `en/translation.json`
- **Skills / Tips / Proyectos:** `src/data/portfolio.js`
- **Colores y tipografías:** `src/styles/_variables.scss` (ver `DESIGN.md`)

## Deploy

Firebase Hosting (carpeta `dist`) + Functions:

```bash
npm run build
firebase deploy                 # hosting + functions
firebase deploy --only hosting  # solo el front
```
