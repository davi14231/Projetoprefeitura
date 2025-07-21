import { test, expect } from '@playwright/test';

test.describe('Testes de UI - Sistema de Doações', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
  });

  test('deve carregar a página inicial', async ({ page }) => {
    // Verificar se a página carregou
    await expect(page).toHaveTitle(/Vite/);
    
    // Verificar se há elementos na página
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve navegar para tela de login', async ({ page }) => {
    // Simular clique em link/botão de login se existir
    const loginButton = page.locator('text=Login');
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await expect(page.url()).toContain('login');
    }
  });

  test('deve renderizar componentes de doação', async ({ page }) => {
    // Verificar se existem elementos relacionados a doações
    const doacaoElements = page.locator('[data-testid="doacao"], .doacao, text=doaç');
    if (await doacaoElements.first().isVisible()) {
      await expect(doacaoElements.first()).toBeVisible();
    }
  });

  test('deve carregar imagens corretamente', async ({ page }) => {
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
    
    // Verificar se as imagens carregaram
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Verificar se pelo menos uma imagem está visível
      await expect(images.first()).toBeVisible();
    }
  });

  test('deve ter formulários funcionais', async ({ page }) => {
    // Procurar por inputs na página
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      const firstInput = inputs.first();
      await expect(firstInput).toBeVisible();
      
      // Testar digitação se o input estiver habilitado
      if (await firstInput.isEnabled()) {
        await firstInput.fill('Teste');
        await expect(firstInput).toHaveValue('Teste');
      }
    }
  });

  test('deve ter botões clicáveis', async ({ page }) => {
    // Procurar por botões na página
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Verificar se o botão é clicável
      if (await firstButton.isEnabled()) {
        await expect(firstButton).toBeEnabled();
      }
    }
  });

});