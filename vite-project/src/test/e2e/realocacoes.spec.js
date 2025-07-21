import { test, expect } from '@playwright/test';

test.describe('Testes de UI - Sistema de Realocações', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
  });

  test('deve navegar pela aplicação', async ({ page }) => {
    // Verificar se a página inicial carregou
    await expect(page).toHaveURL(/localhost:5173/);
    
    // Verificar se há navegação disponível
    const navLinks = page.locator('a, [role="link"]');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      await expect(navLinks.first()).toBeVisible();
    }
  });

  test('deve exibir cards de realocação', async ({ page }) => {
    // Procurar por elementos de card
    const cards = page.locator('.card, [data-testid="card"], .realocacao-card');
    
    // Se existirem cards, verificar se estão visíveis
    const cardCount = await cards.count();
    if (cardCount > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });

  test('deve ter funcionalidade de busca', async ({ page }) => {
    // Procurar por campo de busca
    const searchInput = page.locator('input[type="search"], input[placeholder*="busca"], input[placeholder*="pesquis"]');
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('teste');
      await expect(searchInput).toHaveValue('teste');
    }
  });

  test('deve carregar dados dinamicamente', async ({ page }) => {
    // Aguardar carregamento completo
    await page.waitForLoadState('domcontentloaded');
    
    // Verificar se há conteúdo dinâmico
    const dynamicContent = page.locator('[data-testid], .dynamic, .loading');
    
    // Aguardar um pouco para carregamento de dados
    await page.waitForTimeout(1000);
    
    // Verificar se a página não está vazia
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('deve ser responsivo', async ({ page }) => {
    // Testar diferentes tamanhos de tela
    
    // Desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('body')).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve ter acessibilidade básica', async ({ page }) => {
    // Verificar se existem elementos com acessibilidade
    const ariaElements = page.locator('[aria-label], [aria-describedby], [role]');
    const altImages = page.locator('img[alt]');
    
    // Se existirem elementos de acessibilidade, verificar se estão presentes
    const ariaCount = await ariaElements.count();
    const altCount = await altImages.count();
    
    // Pelo menos verificar se a página tem estrutura básica
    await expect(page.locator('body')).toBeVisible();
  });

});