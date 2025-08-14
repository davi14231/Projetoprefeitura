import { test, expect } from '@playwright/test';

test('Home carrega e mostra imagem', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('img').first()).toBeVisible();
});

test('Navega para todas-doacoes', async ({ page }) => {
  await page.goto('/');
  // Na página inicial pública existe um botão que leva para /todas-doacoes
  await page.getByRole('button', { name: 'Ver Todas as Necessidades' }).click();
  await expect(page).toHaveURL(/todas-doacoes/);
});
