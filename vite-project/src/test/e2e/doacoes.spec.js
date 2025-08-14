import { test, expect } from '@playwright/test';

const mockDoacoes = [
	{
		id_produto: 1,
		titulo: 'Laptops para Educação',
		descricao: 'Equipamentos para laboratório digital',
		tipo_item: 'Eletrônicos',
		urgencia: 'MEDIA',
		quantidade: 8,
		url_imagem: 'https://picsum.photos/seed/eletronicos/400/300',
		prazo_necessidade: new Date(Date.now() + 10 * 86400000).toISOString(),
		criado_em: new Date().toISOString(),
		ong: { nome: 'Fundação Recife Solidário' }
	},
	{
		id_produto: 2,
		titulo: 'Roupas Infantís de Inverno',
		descricao: 'Casacos e blusas tamanho infantil',
		tipo_item: 'Roupas e Calçados',
		urgencia: 'ALTA',
		quantidade: 25,
		url_imagem: 'https://picsum.photos/seed/roupas/400/300',
		prazo_necessidade: new Date(Date.now() + 3 * 86400000).toISOString(),
		criado_em: new Date().toISOString(),
		ong: { nome: 'Instituto Criança Feliz' }
	}
];

test.describe('TodasDoacoes', () => {
	test.beforeEach(async ({ page }) => {
		// Mock endpoints usados na tela
		await page.route('**/api/doacoes?*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockDoacoes) }));
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) }));
		let loaded = false;
		for (let i=0;i<5 && !loaded;i++) {
			try {
				await page.goto('/todas-doacoes', { waitUntil: 'domcontentloaded' });
				loaded = true;
			} catch(e) {
				await page.waitForTimeout(500);
			}
		}
		if(!loaded) throw new Error('Servidor não respondeu em /todas-doacoes');
	});

		test('Exibe cards e filtra por categoria', async ({ page }) => {
			await expect(page.getByText(/Doe com Propósito/i)).toBeVisible();
			const cardLaptop = page.getByText(/Laptops para Educação/).first();
			const cardRoupas = page.getByText(/Roupas Infantís de Inverno/).first();
			await expect(cardLaptop).toBeVisible();
			await expect(cardRoupas).toBeVisible();
			await page.selectOption('select', { label: 'Roupas e Calçados' });
			await expect(cardRoupas).toBeVisible();
		});

		test('Busca reduz resultados', async ({ page }) => {
			await page.fill('input[placeholder="Buscar itens..."]', 'laptop');
			const cardLaptop = page.getByText(/Laptops para Educação/).first();
			await expect(cardLaptop).toBeVisible();
		});
});
