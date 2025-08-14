import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './src/test/e2e',
	globalSetup: './playwright.global-setup.js',
	timeout: 30_000,
	expect: { timeout: 5_000 },
	fullyParallel: true,
	retries: 0,
		reporter: [
			['list'],
			['html', { outputFolder: 'playwright-report', open: 'never' }]
		],
		use: {
			baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		video: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},
		webServer: {
			command: 'npm run build && npm run preview',
			url: 'http://localhost:4173',
			reuseExistingServer: true,
			timeout: 120_000
		},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }
	]
});
