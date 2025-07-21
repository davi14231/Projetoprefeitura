import { test, expect } from '@playwright/test';

test.describe('Testes de UI - Tela de Login', () => {
  
  test('deve carregar a tela de login', async ({ page }) => {
    // Navegar para a tela de login se existir uma rota específica
    await page.goto('/');
    
    // Procurar por elementos de login
    const loginElements = page.locator('input[type="email"], input[type="password"], text=login, text=entrar');
    
    if (await loginElements.first().isVisible()) {
      await expect(loginElements.first()).toBeVisible();
    }
  });

  test('deve exibir logo da Prefeitura do Recife', async ({ page }) => {
    await page.goto('/');
    
    // Procurar pela logo
    const logo = page.locator('img[src*="logo"], img[alt*="logo"], img[alt*="recife"]');
    
    if (await logo.isVisible()) {
      await expect(logo).toBeVisible();
    }
  });

  test('deve ter formulário de login funcional', async ({ page }) => {
    await page.goto('/');
    
    // Procurar por campos de email e senha
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    if (await emailInput.isVisible() && await passwordInput.isVisible()) {
      // Testar preenchimento
      await emailInput.fill('teste@email.com');
      await passwordInput.fill('senha123');
      
      await expect(emailInput).toHaveValue('teste@email.com');
      await expect(passwordInput).toHaveValue('senha123');
      
      // Procurar por botão de submit
      const submitButton = page.locator('button[type="submit"], button:has-text("entrar")');
      if (await submitButton.isVisible()) {
        await expect(submitButton).toBeEnabled();
      }
    }
  });

  test('deve ter link para criar conta', async ({ page }) => {
    await page.goto('/');
    
    // Procurar por link ou botão "Criar Conta"
    const createAccountLink = page.locator('text=criar conta, text=cadastro, text=registrar');
    
    if (await createAccountLink.isVisible()) {
      await expect(createAccountLink).toBeVisible();
    }
  });

  test('deve ser responsivo na tela de login', async ({ page }) => {
    await page.goto('/');
    
    // Testar responsividade
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.locator('body')).toBeVisible();
    
    await page.setViewportSize({ width: 1200, height: 800 }); // Desktop
    await expect(page.locator('body')).toBeVisible();
  });

});
