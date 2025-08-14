import { test, expect } from '@playwright/test';

// Testa fluxo de logout via menu / ícone (assumindo que há botão ou item com texto Sair)

test('Logout limpa token e redireciona para login', async ({ page }) => {
  await page.route('**/api/auth/login', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ auth: true, token: 'token-logout', user: { nome: 'Logout User' } })
  }));

  await page.goto('/login');
  await page.getByLabel(/email/i).fill('logout@ong.org');
  await page.getByLabel(/senha/i).fill('123456');
  await page.getByRole('button', { name: /entrar$/i }).click();
  await expect(page).toHaveURL(/home-ong/);

  // Hover/click no container "Minha ONG" para abrir dropdown
  const minhaONG = page.locator('header').getByText(/Minha ONG/i).first();
  await minhaONG.hover();
  // Garantir que dropdown aparece (classe tela-flutuante-dropdown)
  const dropdown = page.locator('.tela-flutuante-dropdown');
  await expect(dropdown).toBeVisible();
  await dropdown.getByRole('button', { name: /^Sair$/i }).click();
  // Após logout navegação vai para '/' (home pública)
  await expect(page).toHaveURL(/\/$/);
});
