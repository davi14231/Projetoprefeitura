import { test, expect } from '@playwright/test';

// Testa fluxo de criação de doação via modal + listagem "Solicitações postadas"
test.describe('Criar Doação (SolicitarDoacao)', () => {
	async function autenticar(page) {
		await page.route('**/api/auth/login', route => route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ auth: true, token: 'token-criar', user: { nome: 'ONG Criadora', email: 'criadora@ong.org' } })
		}));
		// Mock inicial vazio
		const store = { doacoes: [] };
		await page.route('**/api/doacoes/minhas/ativas', route => {
			return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(store.doacoes) });
		});
		await page.route('**/api/doacoes?*', route => {
			return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(store.doacoes) });
		});
		await page.route('**/api/doacoes/prestes-*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
		await page.route('**/api/doacoes', async route => {
			if (route.request().method() === 'POST') {
				const body = await route.request().postDataJSON();
				// Emular criação no backend (shape esperado)
				const novo = {
					id_produto: store.doacoes.length + 1,
					titulo: body.titulo,
					descricao: body.descricao,
					tipo_item: body.tipo_item,
					urgencia: body.urgencia,
					quantidade: body.quantidade,
					url_imagem: body.url_imagem || 'https://picsum.photos/seed/nova/400/300',
					prazo_necessidade: body.prazo_necessidade,
					criado_em: new Date().toISOString(),
					ong: { nome: 'ONG Criadora' },
					whatsapp: body.whatsapp,
					email: body.email
				};
				store.doacoes.push(novo);
				return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(novo) });
			}
			return route.continue();
		});

		await page.goto('/login');
		await page.getByLabel(/email/i).fill('criadora@ong.org');
		await page.getByLabel(/senha/i).fill('123456');
		await page.getByRole('button', { name: /entrar$/i }).click();
		await expect(page).toHaveURL(/home-ong/);
		return store; // retornar referência para assertions futuras se necessário
	}

	test('Cria uma nova solicitação de doação', async ({ page }) => {
		await autenticar(page);
		// Ir para área de edição
		await page.goto('/edit-doacoes');
		await expect(page.getByRole('button', { name: /\+ adicionar nova necessidade/i })).toBeVisible();
		await page.getByRole('button', { name: /\+ adicionar nova necessidade/i }).click();

		// Modal aberto: preencher campos
		await page.getByLabel('Título').fill('Kits de Higiene');
		await page.getByLabel('Quantidade').fill('12');
		await page.getByLabel('Categoria').selectOption({ label: 'Saúde e Higiene' });
		await page.getByLabel('Urgência').selectOption('ALTA');
		await page.getByLabel('Prazo').selectOption({ label: '30 dias' });
		await page.getByLabel('WhatsApp para contato').fill('(81) 99999-8888');
		await page.getByLabel('Email para contato').fill('contato@ong.org');
		await page.getByLabel(/Descrição e propósito/i).fill('Itens para kits de higiene familiar.');

		// Capturar alert(s)
		page.once('dialog', dialog => dialog.accept());
		await page.getByRole('button', { name: /publicar solicitação/i }).click();

		// Após criação a listagem deve conter o item
		await expect(page.getByText('Kits de Higiene')).toBeVisible();
	});
});
