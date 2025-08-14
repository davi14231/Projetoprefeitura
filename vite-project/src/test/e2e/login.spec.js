import { test, expect } from '@playwright/test';

// Mocks reutilizáveis
const mockDoacoes = [
	{
		id_produto: 1,
		titulo: 'Cestas Básicas Completas',
		descricao: 'Alimentos essenciais',
		tipo_item: 'Alimentos',
		urgencia: 'ALTA',
		quantidade: 10,
		url_imagem: 'https://picsum.photos/seed/doacao1/400/300',
		prazo_necessidade: new Date(Date.now() + 5 * 86400000).toISOString(),
		criado_em: new Date().toISOString(),
		ong: { nome: 'Instituto Criança Feliz' }
	}
];

test.describe('Login', () => {
	test.beforeEach(async ({ page }) => {
		// Limpar estado antes de cada cenário
		await page.context().clearCookies();
		await page.addInitScript(() => localStorage.clear());
	});

	test('Fluxo de login bem-sucedido redireciona para home protegida', async ({ page }) => {
		// Interceptar login
		await page.route('**/api/auth/login', async route => {
			const body = await route.request().postDataJSON();
			if (body.email_ong === 'ong1@gmail.com' && body.password === '123456') {
				return route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ auth: true, token: 'fake-token', user: { nome: 'ONG Teste', email: 'ong1@gmail.com' } })
				});
			}
			return route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ message: 'Credenciais inválidas' }) });
		});

		// Interceptar doações que serão carregadas depois do login
		await page.route('**/api/doacoes**', route => route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(mockDoacoes)
		}));

		// Interceptar listas específicas (minhas / prestes a vencer) para evitar 404s
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.route('**/api/doacoes/minhas/*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));

		await page.goto('/login');
		// Usar texto simples (CardTitle pode não ter role heading semanticamente)
		await expect(page.getByText(/Entrar como ONG/i)).toBeVisible();
		await page.getByLabel(/email/i).fill('ong1@gmail.com');
		await page.getByLabel(/senha/i).fill('123456');
		await page.getByRole('button', { name: /entrar$/i }).click();

		// Redireciona para /home-ong (protegida)
		await expect(page).toHaveURL(/home-ong/);
		// Verifica que o botão de ver todas as necessidades existe (prova de renderização da home autenticada)
		await expect(page.getByRole('button', { name: /ver todas as necessidades/i })).toBeVisible();
	});

		test('Login falha com credenciais inválidas', async ({ page }) => {
		await page.route('**/api/auth/login', async route => {
			return route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ message: 'Credenciais inválidas' }) });
		});

		await page.goto('/login');
		await page.getByLabel(/email/i).fill('x@y.com');
		await page.getByLabel(/senha/i).fill('errada');
		await page.getByRole('button', { name: /entrar$/i }).click();

		await expect(page.getByText(/credenciais inválidas|email ou senha incorretos/i)).toBeVisible();
		await expect(page).toHaveURL(/login/); // continua na tela de login
	});
});
