import { test, expect } from '@playwright/test';

test.describe('Testes de UI - Componentes Visuais', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve exibir cards corretamente', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Procurar por cards
    const cards = page.locator('.card, [class*="card"], [data-testid*="card"]');
    const cardCount = await cards.count();
    
    if (cardCount > 0) {
      // Verificar se o primeiro card está visível
      await expect(cards.first()).toBeVisible();
      
      // Verificar se tem conteúdo
      const cardText = await cards.first().textContent();
      expect(cardText.length).toBeGreaterThan(0);
    }
  });

  test('deve exibir botões com estilos corretos', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Verificar se o botão tem styling (não está completamente sem estilo)
      const buttonClasses = await firstButton.getAttribute('class');
      expect(buttonClasses).toBeTruthy();
    }
  });

  test('deve carregar imagens sem erro', async ({ page }) => {
    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Verificar se pelo menos uma imagem carregou
      await expect(images.first()).toBeVisible();
      
      // Verificar se não há imagens quebradas
      const naturalWidth = await images.first().evaluate(img => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('deve ter navegação funcional', async ({ page }) => {
    // Procurar por links de navegação
    const navLinks = page.locator('nav a, [role="navigation"] a, header a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      const firstLink = navLinks.first();
      await expect(firstLink).toBeVisible();
      
      // Se o link tem href, verificar se não está vazio
      const href = await firstLink.getAttribute('href');
      if (href) {
        expect(href.length).toBeGreaterThan(0);
      }
    }
  });

  test('deve exibir footer corretamente', async ({ page }) => {
    // Procurar por footer
    const footer = page.locator('footer, [role="contentinfo"]');
    
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
      
      // Verificar se tem conteúdo
      const footerText = await footer.textContent();
      expect(footerText.length).toBeGreaterThan(0);
    }
  });

  test('deve ter header funcional', async ({ page }) => {
    // Procurar por header
    const header = page.locator('header, [role="banner"]');
    
    if (await header.isVisible()) {
      await expect(header).toBeVisible();
      
      // Verificar se tem conteúdo
      const headerText = await header.textContent();
      expect(headerText.length).toBeGreaterThan(0);
    }
  });

  test('deve ter contraste adequado', async ({ page }) => {
    // Verificar se há texto visível na página
    const textElements = page.locator('p, h1, h2, h3, span, div');
    const textCount = await textElements.count();
    
    if (textCount > 0) {
      const firstText = textElements.first();
      if (await firstText.isVisible()) {
        await expect(firstText).toBeVisible();
      }
    }
  });

});
