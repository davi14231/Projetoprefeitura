import { test, expect } from '@playwright/test';

const mockDoacoesHome = [
	{
		id_produto: 11,
		titulo: 'Kit Material Escolar',
		descricao: 'Cadernos, lápis e mochilas',
		tipo_item: 'Materiais Educativos e Culturais',
		urgencia: 'BAIXA',
		quantidade: 40,
		url_imagem: 'https://picsum.photos/seed/material/400/300',
		prazo_necessidade: new Date(Date.now() + 15 * 86400000).toISOString(),
		criado_em: new Date().toISOString(),
		ong: { nome: 'Educa Brasil' }
	}
];

test.describe('Smoke da Home Pública', () => {
	test.beforeEach(async ({ page }) => {
		// Mock de endpoints (com e sem query)
		await page.route('**/api/doacoes', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockDoacoesHome) }));
		await page.route('**/api/doacoes?*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockDoacoesHome) }));
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) }));

		// Espera servidor ficar pronto tentando várias vezes navegar
		let loaded = false;
		for (let i = 0; i < 5 && !loaded; i++) {
			try {
				await page.goto('/', { waitUntil: 'domcontentloaded' });
				loaded = true;
			} catch (e) {
				await page.waitForTimeout(500);
			}
		}
		if (!loaded) throw new Error('Servidor não respondeu após tentativas');
	});

	test('Carrossel e botão de ver necessidades aparecem', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /conecte-se com quem precisa/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /ver todas as necessidades/i })).toBeVisible();
	});

		test('Lista mostra card mockado', async ({ page }) => {
			const card = page.getByText(/Kit Material Escolar/).first();
			await expect(card).toBeVisible();
		});
});
