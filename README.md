# Portafolio · Fabián

Portafolio personal hecho con **React + Vite**, bilingüe (ES/EN), inspirado en el diseño
de [bobangajicsm](https://bobangajicsm.github.io/portfolio/): paleta navy + amarillo,
sidebar vertical de 6 secciones y animaciones.

## Stack

- **Vite** + **React 18**
- **react-router-dom** v6 — una ruta por sección
- **react-i18next** + detector de idioma — toggle ES/EN
- **framer-motion** — transiciones de página y animaciones
- **Font Awesome** — iconos de navegación y sociales
- **react-loaders** — preloader
- **Sass (SCSS)** — estilos con tokens de diseño

## Secciones (sidebar)

Home · About · Skills · Tips · Portfolio · Contact

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
  components/   Layout, Sidebar, Loader, AnimatedLetters, FLogo3D, PageWrapper
  pages/        Home, About, Skills, Tips, Portfolio, Contact
  locales/      es/ , en/  (traducciones)
  data/         portfolio.js  (skills, tips, proyectos)
  styles/       variables, animations, buttons, index (SCSS)
  assets/img/   logos e imágenes
_legacy/        portafolio estático anterior (referencia)
```

## Personalizar

- **Textos:** `src/locales/es/translation.json` y `en/translation.json`
- **Skills / Tips / Proyectos:** `src/data/portfolio.js`
- **Colores y tipografías:** `src/styles/_variables.scss`

## Pendiente

- Conectar el formulario de Contact (EmailJS) y, opcionalmente, un mapa.
- Reemplazar las miniaturas de proyectos por imágenes reales.
- (Opcional) Migrar `@import` de SCSS a `@use` y desplegar en GitHub Pages.
