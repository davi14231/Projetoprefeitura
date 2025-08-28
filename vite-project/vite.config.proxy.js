// Proxy para contornar problemas de CORS durante desenvolvimento
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8004,
    proxy: {
      '/api': {
        target: 'http://vm-cinboraimpactar2.cin.ufpe.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
  "@": path.resolve(typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : new URL('.', import.meta.url).pathname, "./src"),
    },
  },
})
