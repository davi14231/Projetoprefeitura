import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8004,
    proxy: {
      // Proxy para contornar CORS - redireciona /api/* para backend:3004/*
      '/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Proxy alternativo para ambiente Docker
      '/api-docker': {
        target: 'http://projeto-prefeitura-backend:3004/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-docker/, '')
      }
    }
  },
  resolve: {
    alias: {
  // import.meta.dirname é suportado a partir do Node 20; fallback manual
  "@": path.resolve(typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : new URL('.', import.meta.url).pathname, "./src"),
    },
  },
})