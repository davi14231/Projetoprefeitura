import { test, expect } from '@playwright/test';

const mockRealocacoes = [
	{
		id_produto: 101,
		titulo: 'Mesas de Escritório',
		descricao: 'Mesas de madeira em bom estado',
		tipo_item: 'Eletrodomésticos e Móveis',
		quantidade: 5,
		url_imagem: 'https://picsum.photos/seed/mesa/400/300',
		prazo_necessidade: new Date(Date.now() + 20 * 86400000).toISOString(),
		criado_em: new Date().toISOString(),
		ong: { nome: 'Casa Nova ONG' }
	}
];

test.describe('RealocacaoListagem', () => {
	test.beforeEach(async ({ page }) => {
		await page.route('**/api/realocacoes/catalogo?*', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockRealocacoes) }));
		// Retry para evitar race onde o servidor preview ainda não está pronto em alguns workers (especialmente Firefox)
		for (let attempt = 1; attempt <= 5; attempt++) {
			try {
				await page.goto('/realocacao-listagem', { waitUntil: 'domcontentloaded' });
				break; // sucesso
			} catch (err) {
				if (attempt === 5) throw err;
				await page.waitForTimeout(600);
			}
		}
	});

		test('Lista realocações e mostra card', async ({ page }) => {
			await expect(page.getByText(/Realocação de Itens entre/i)).toBeVisible();
			const cardMesa = page.getByText(/Mesas de Escritório/).first();
			await expect(cardMesa).toBeVisible();
		});
});
