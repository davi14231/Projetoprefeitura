import { test, expect } from '@playwright/test';

async function autenticarComMocksRealocacoes(page) {
  const store = { realocacoes: [] };
  await page.route('**/api/auth/login', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ auth: true, token: 'token-realoc', user: { nome: 'ONG REAL', email: 'real@ong.org' } })
  }));

  const fulfillJSON = (data, status=200) => ({ status, contentType: 'application/json', body: JSON.stringify(data) });
  await page.route('**/api/realocacoes/minhas/ativas', route => route.fulfill(fulfillJSON(store.realocacoes)));
  await page.route('**/api/realocacoes/catalogo?*', route => route.fulfill(fulfillJSON(store.realocacoes)));

  await page.route('**/api/realocacoes', async route => {
    if (route.request().method() === 'POST') {
      const body = await route.request().postDataJSON();
      const novo = {
        id_produto: store.realocacoes.length + 1,
        titulo: body.titulo,
        descricao: body.descricao,
        tipo_item: body.tipo_item,
        urgencia: body.urgencia,
        quantidade: body.quantidade,
        url_imagem: body.url_imagem || 'https://picsum.photos/seed/novaReal/400/300',
        prazo_necessidade: body.prazo_necessidade,
        criado_em: new Date().toISOString(),
        ong: { nome: 'ONG REAL' },
        whatsapp: body.whatsapp,
        email: body.email,
        status: 'ATIVA'
      };
      store.realocacoes.push(novo);
      return route.fulfill(fulfillJSON(novo, 201));
    }
    return route.continue();
  });

  await page.route(new RegExp('.*/api/realocacoes/\\d+.*'), async route => {
    const url = route.request().url();
    const idMatch = url.match(/realocacoes\/(\d+)/);
    const id = idMatch ? Number(idMatch[1]) : null;
    const method = route.request().method();
    if (!id) return route.continue();
    const idx = store.realocacoes.findIndex(d => d.id_produto === id);
    if (method === 'PUT') {
      const body = await route.request().postDataJSON();
      if (idx >= 0) {
        store.realocacoes[idx] = { ...store.realocacoes[idx], titulo: body.titulo, descricao: body.descricao };
        return route.fulfill(fulfillJSON(store.realocacoes[idx]));
      }
    } else if (method === 'PATCH') {
      const body = await route.request().postDataJSON();
      if (idx >= 0 && body.status) {
        store.realocacoes[idx].status = body.status;
        return route.fulfill(fulfillJSON({ ok: true }));
      }
    } else if (method === 'DELETE') {
      if (idx >= 0) {
        store.realocacoes.splice(idx,1);
        return route.fulfill(fulfillJSON({ ok: true }));
      }
    }
    return route.fulfill(fulfillJSON({ message: 'Not found' }, 404));
  });

  await page.goto('/login');
  await page.getByLabel(/email/i).fill('real@ong.org');
  await page.getByLabel(/senha/i).fill('123456');
  await page.getByRole('button', { name: /entrar$/i }).click();
  await expect(page).toHaveURL(/home-ong/);
  return store;
}

// Test principal
test.describe('CRUD Realocações (UI)', () => {
  test('Criar, Editar, Encerrar e Excluir Realocação', async ({ page }) => {
    const store = await autenticarComMocksRealocacoes(page);

    await page.goto('/home-realocacao');
    await expect(page.getByRole('button', { name: /\+ Adicionar Nova Realocação/i })).toBeVisible();

    // Criar
    await page.getByRole('button', { name: /\+ Adicionar Nova Realocação/i }).click();
    await page.getByLabel('Título').fill('Realocação Teste');
    await page.getByLabel('Quantidade').fill('3');
    await page.getByLabel('Categoria').selectOption({ label: 'Eletrodomésticos e Móveis' });
    await page.getByLabel('WhatsApp para contato').fill('(81) 97777-6666');
    await page.getByLabel('Email para contato').fill('real@ong.org');
    await page.getByLabel('Descrição:').fill('Itens para repasse.');
    page.once('dialog', d => d.accept());
    await page.getByRole('button', { name: /^Publicar$/i }).click();
    await expect(page.getByText('Realocação Teste')).toBeVisible();

    // Editar
    await page.getByRole('button', { name: /^Editar$/i }).first().click();
    const titulo = page.getByLabel('Título');
    await titulo.fill('Realocação Teste Editada');
    page.once('dialog', d => d.accept());
    await page.getByRole('button', { name: /^Publicar$/i }).click();
    await expect(page.getByText('Realocação Teste Editada')).toBeVisible();

    // Encerrar
    await page.getByRole('button', { name: /Realocação Concluída/i }).click();
    await page.getByRole('button', { name: /^Encerrar$/i }).click();
    page.once('dialog', d => d.accept());

  // Excluir
  await page.getByTitle('Excluir').first().click();
  const modalExcluir = page.getByTestId('confirmacao-deletar');
  await expect(modalExcluir).toBeVisible();
  page.once('dialog', d => d.accept());
  await modalExcluir.getByTestId('confirmar-excluir').click();

    await expect(page.getByText('Realocação Teste Editada')).toHaveCount(0);
    expect(store.realocacoes.length).toBe(0);
  });
});
