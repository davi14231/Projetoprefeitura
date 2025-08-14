import { test, expect } from '@playwright/test';

// Cenários de rotas protegidas (sem e com autenticação)
test.describe('Rotas Protegidas', () => {
	test('Redireciona usuário não autenticado para home pública', async ({ page }) => {
		// Interceptar qualquer chamada de API para evitar erros de rede
		await page.route('**/api/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));

		await page.goto('/edit-doacoes'); // rota protegida
		await expect(page).toHaveURL(/\/?$/); // volta para a home '/'
		await expect(page.getByRole('button', { name: /ver todas as necessidades/i })).toBeVisible();
	});

	test('Acessa rota protegida após login válido', async ({ page }) => {
		// Mock login
		await page.route('**/api/auth/login', route => {
			return route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ auth: true, token: 'token-abc', user: { nome: 'ONG Exemplo', email: 'ong@exemplo.org' } })
			});
		});
		// Mock das listas chamadas após login
		await page.route('**/api/doacoes**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.route('**/api/realocacoes**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.route('**/api/doacoes/minhas/*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));

		await page.goto('/login');
		await page.getByLabel(/email/i).fill('ong@exemplo.org');
		await page.getByLabel(/senha/i).fill('123456');
		await page.getByRole('button', { name: /entrar$/i }).click();

		// Esperar redirecionamento para home autenticada para garantir que o contexto atualizou
		await expect(page).toHaveURL(/home-ong/);

		// Agora navegar para rota protegida específica
		await page.goto('/edit-doacoes');
		await expect(page).toHaveURL(/edit-doacoes/);
		await expect(page.getByRole('button', { name: /\+ adicionar nova necessidade/i })).toBeVisible();
	});
});
