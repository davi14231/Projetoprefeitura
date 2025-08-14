import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

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
		}
	}
});
