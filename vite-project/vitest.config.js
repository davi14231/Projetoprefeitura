import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: [
      "src/test/e2e/*", // ignora todos os testes E2E
      "**/*.e2e.js",    // ignora arquivos com extensão .e2e.js
      "node_modules/**", // ignora testes em node_modules
    ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});