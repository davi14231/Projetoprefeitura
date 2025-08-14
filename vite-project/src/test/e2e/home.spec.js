import { test, expect } from '@playwright/test';

test('Home carrega e mostra alguma imagem do carrossel', async ({ page }) => {
  await page.goto('/');
  const firstImg = page.locator('img').first();
  await expect(firstImg).toBeVisible();
});

test('Navega para lista de necessidades', async ({ page }) => {
  await page.goto('/');
  // Botão possui o texto completo
  const botao = page.getByRole('button', { name: /ver todas as necessidades/i });
  await botao.click();
  await expect(page).toHaveURL(/todas-doacoes/);
});
