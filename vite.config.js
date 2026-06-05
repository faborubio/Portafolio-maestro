import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // el SW se actualiza solo tras cada deploy
      includeAssets: ['logo-f.png', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Fabián Rubio · Desarrollador Web Full Stack',
        short_name: 'Fabián Rubio',
        description:
          'Portafolio de Fabián Rubio — Desarrollador Web Full Stack (React, Angular, TypeScript, Node.js).',
        lang: 'es',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a1221',
        theme_color: '#0a1221',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        // No interceptar el endpoint del formulario con el fallback SPA
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  // base: '/Portafolio-maestro/', // descomentar al desplegar en GitHub Pages
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // Silencia los avisos de deprecación de @import mientras no migremos a @use
        silenceDeprecations: ['import', 'legacy-js-api'],
      },
    },
  },
})
