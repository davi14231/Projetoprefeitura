import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    exclude: [
      "src/test/e2e/*", // ignora todos os testes E2E
      "**/*.e2e.js",    // ignora arquivos com extensão .e2e.js
      "node_modules/**", // ignora testes em node_modules
    ],
  },
});