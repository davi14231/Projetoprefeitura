import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import url from 'node:url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./unit-tests/setup-vitest.ts'],
		globals: true,
		include: [
			'unit-tests/**/*.{test,spec}.{js,jsx,ts,tsx}'
		],
		exclude: ['node_modules/**'],
		coverage: {
			reporter: ['text','html'],
			exclude: [
				'check-integration.*',
				'mock-server.js',
				'playwright.*.js',
				'**/playwright.config.js'
					,'src/test/e2e/**/*.spec.js'
					// Excluir configs e build output que poluem cobertura
					,'**/dist/**'
					,'vite.config.*'
					,'eslint.config.js'
					,'vitest.config.js'
					,'src/test/**'
					// Arquivos placeholder / não utilizados
					,'src/components/ui/Confirmacaoencerrarnecessidade.jsx'
					,'src/components/ui/paginas/TestRealocacao.jsx'
					,'src/services/api.proxy.js'
			]
		}
	}
});
