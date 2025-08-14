import { test, expect } from '@playwright/test';

// Gera mock com N doações backend-shape
function gerarDoacoes(qtd = 15) {
	const agora = Date.now();
	return Array.from({ length: qtd }).map((_, i) => ({
		id_produto: i + 1,
		titulo: `Item Paginado ${i + 1}`,
		descricao: `Descricao do item ${i + 1}`,
		tipo_item: i % 2 === 0 ? 'Eletrônicos' : 'Roupas e Calçados',
		urgencia: ['ALTA','MEDIA','BAIXA'][i % 3],
		quantidade: (i + 1) * 2,
		url_imagem: 'https://picsum.photos/seed/pag'+(i+1)+'/400/300',
		prazo_necessidade: new Date(agora + (i+5) * 86400000).toISOString(),
		criado_em: new Date(agora - i * 86400000).toISOString(),
		ong: { nome: `ONG Teste ${i + 1}` }
	}));
}

test.describe('Paginação & Modal de Detalhe', () => {
	test.beforeEach(async ({ page }) => {
		const mockArray = gerarDoacoes(15); // 15 -> 3 páginas (6 por página)
		await page.route('**/api/doacoes?*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockArray) }));
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.goto('/todas-doacoes');
		await expect(page.getByText(/Doe com Propósito/i)).toBeVisible();
	});

	test('Mostra primeira página e navega para última', async ({ page }) => {
		// Página 1 deve conter Item Paginado 1 e não conter 13 (que está na página 3)
		await expect(page.getByText('Item Paginado 1')).toBeVisible();
		await expect(page.getByText('Item Paginado 13')).toHaveCount(0);

		// Clicar no número da página 3 (última) ou navegar por Próximo › duas vezes
		await page.getByRole('button', { name: '3' }).click();
		await expect(page).toHaveURL(/page=3/);
		await expect(page.getByText('Item Paginado 13')).toBeVisible();
	});

	test('Abre modal de detalhe ao clicar em card', async ({ page }) => {
		await page.getByText('Item Paginado 2').first().click();
		await expect(page.getByRole('heading', { name: /Item Paginado 2/ })).toBeVisible();
		await expect(page.getByRole('button', { name: /Compartilhar/i })).toBeVisible();
	});
});
