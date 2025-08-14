import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // Proxy para contornar CORS - redireciona /api/* para localhost:3000/*
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
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