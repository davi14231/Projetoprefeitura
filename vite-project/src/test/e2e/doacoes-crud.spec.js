import { test, expect } from '@playwright/test';

/** Helper para autenticar e mockar endpoints de doações com store em memória */
async function autenticarComMocksDoacoes(page) {
  const store = { doacoes: [] };

  // Login
  await page.route('**/api/auth/login', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ auth: true, token: 'token-crud', user: { nome: 'ONG CRUD', email: 'crud@ong.org' } })
  }));

  // Listagem pública & minhas
  const fulfillJSON = (data, status=200) => ({ status, contentType: 'application/json', body: JSON.stringify(data) });
  await page.route('**/api/doacoes/minhas/ativas', route => route.fulfill(fulfillJSON(store.doacoes)));
  await page.route('**/api/doacoes?*', route => route.fulfill(fulfillJSON(store.doacoes)));
  await page.route('**/api/doacoes/prestes-*', route => route.fulfill(fulfillJSON([])));

  // CRUD principal
  await page.route('**/api/doacoes', async route => {
    if (route.request().method() === 'POST') {
      const body = await route.request().postDataJSON();
      const novo = {
        id_produto: store.doacoes.length + 1,
        titulo: body.titulo,
        descricao: body.descricao,
        tipo_item: body.tipo_item,
        urgencia: body.urgencia,
        quantidade: body.quantidade,
        url_imagem: body.url_imagem || 'https://picsum.photos/seed/novaDoacao/400/300',
        prazo_necessidade: body.prazo_necessidade,
        criado_em: new Date().toISOString(),
        ong: { nome: 'ONG CRUD' },
        whatsapp: body.whatsapp,
        email: body.email,
        status: 'ATIVA'
      };
      store.doacoes.push(novo);
      return route.fulfill(fulfillJSON(novo, 201));
    }
    return route.continue();
  });

  // PUT / PATCH / DELETE / STATUS
  await page.route(new RegExp('.*/api/doacoes/\\d+.*'), async route => {
    const url = route.request().url();
    const idMatch = url.match(/doacoes\/(\d+)/);
    const id = idMatch ? Number(idMatch[1]) : null;
    const method = route.request().method();
    if (!id) return route.continue();
    const idx = store.doacoes.findIndex(d => d.id_produto === id);
    if (method === 'PUT') {
      const body = await route.request().postDataJSON();
      if (idx >= 0) {
        store.doacoes[idx] = { ...store.doacoes[idx], titulo: body.titulo, descricao: body.descricao };
        return route.fulfill(fulfillJSON(store.doacoes[idx]));
      }
    } else if (method === 'PATCH') { // status
      const body = await route.request().postDataJSON();
      if (idx >= 0 && body.status) {
        store.doacoes[idx].status = body.status;
        return route.fulfill(fulfillJSON({ ok: true }));
      }
    } else if (method === 'DELETE') {
      if (idx >= 0) {
        store.doacoes.splice(idx,1);
        return route.fulfill(fulfillJSON({ ok: true }));
      }
    }
    return route.fulfill(fulfillJSON({ message: 'Not found' }, 404));
  });

  // Retry para garantir que o servidor esteja pronto (especialmente no Firefox)
  let loaded = false;
  for (let i=0;i<5 && !loaded;i++) {
    try {
      await page.goto('/login', { waitUntil: 'domcontentloaded' });
      loaded = true;
    } catch(e) {
      await page.waitForTimeout(500);
    }
  }
  if(!loaded) throw new Error('Servidor não respondeu em /login');
  await page.getByLabel(/email/i).fill('crud@ong.org');
  await page.getByLabel(/senha/i).fill('123456');
  await page.getByRole('button', { name: /entrar$/i }).click();
  await expect(page).toHaveURL(/home-ong/);
  return store;
}

// Agrupando cenários
test.describe('CRUD Doações (UI)', () => {
  test('Criar, Editar, Encerrar e Excluir Doação', async ({ page }) => {
    const store = await autenticarComMocksDoacoes(page);

    // Ir para /edit-doacoes
    await page.goto('/edit-doacoes');
    await expect(page.getByRole('button', { name: /\+ adicionar nova necessidade/i })).toBeVisible();

    // Criar
    await page.getByRole('button', { name: /\+ adicionar nova necessidade/i }).click();
    await page.getByLabel('Título').fill('Doação Teste CRUD');
    await page.getByLabel('Quantidade').fill('5');
    await page.getByLabel('Categoria').selectOption({ label: 'Eletrônicos' });
    await page.getByLabel('Urgência').selectOption('ALTA');
    await page.getByLabel('Prazo').selectOption({ label: '30 dias' });
    await page.getByLabel('WhatsApp para contato').fill('(81) 98888-7777');
    await page.getByLabel('Email para contato').fill('crud@ong.org');
    await page.getByLabel(/Descrição e propósito/i).fill('Descrição inicial');
    page.once('dialog', d => d.accept());
    await page.getByRole('button', { name: /publicar solicitação/i }).click();
    await expect(page.getByText('Doação Teste CRUD')).toBeVisible();

    // Editar
    await page.getByRole('button', { name: /^Editar$/i }).first().click();
    const tituloInput = page.getByLabel('Título');
    await expect(tituloInput).toBeVisible();
    await tituloInput.fill('Doação Teste CRUD Editada');
    page.once('dialog', d => d.accept());
    await page.getByRole('button', { name: /publicar solicitação/i }).click();
    await expect(page.getByText('Doação Teste CRUD Editada')).toBeVisible();

    // Encerrar (status)
    await page.getByRole('button', { name: /Doação Recebida/i }).click();
    // Modal encerrar -> botão Encerrar
    await page.getByRole('button', { name: /^Encerrar$/i }).click();
    page.once('dialog', d => d.accept()); // alerta sucesso

  // Excluir (abrir ícone com title Excluir depois confirmar dentro do modal)
  await page.getByTitle('Excluir').first().click();
  const modalExcluir = page.getByTestId('confirmacao-deletar');
  await expect(modalExcluir).toBeVisible();
  page.once('dialog', d => d.accept());
  await modalExcluir.getByTestId('confirmar-excluir').click();

    // Verificar remoção (texto não aparece mais)
    await expect(page.getByText('Doação Teste CRUD Editada')).toHaveCount(0);
    expect(store.doacoes.length).toBe(0);
  });
});
