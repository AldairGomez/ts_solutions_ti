import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  ssgOptions: {
    includedRoutes(paths, routes) {
      const langs = ['es', 'en'];
      const pages = ['/', '/servicios', '/contacto'];
      // Generar todas las combinaciones, ej: /es, /es/servicios
      const dynamicRoutes = langs.flatMap(lang => 
        pages.map(page => page === '/' ? `/${lang}` : `/${lang}${page}`)
      );
      // Incluir también la raíz '/'
      return ['/', ...dynamicRoutes];
    }
  }
})
