import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
