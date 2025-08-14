/**
 * 🔗 Script de Teste de Conectividade Backend
 * 
 * Este script testa a conectividade com o backend e pode ser executado
 * no console do navegador para depuração.
 */

// Base da API configurável por ambiente
const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';

async function testarBackend() {
  console.log('🔍 Iniciando testes de conectividade...');
  
  const baseUrl = API_BASE_URL;
  
  // Teste 1: Verificar se backend está respondendo
  try {
    console.log('1️⃣ Testando conectividade básica...');
    const response = await fetch(baseUrl);
    const text = await response.text();
    console.log('✅ Backend respondendo:', response.status, text);
  } catch (error) {
    console.error('❌ Backend não está respondendo:', error.message);
    return;
  }
  
  // Teste 2: Testar endpoint de login
  try {
    console.log('2️⃣ Testando endpoint de login...');
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email_ong: 'teste@exemplo.com',
        password: '123456'
      })
    });
    
    const data = await response.json();
    console.log('📝 Resposta do login:', response.status, data);
    
    if (response.status === 401) {
      console.log('✅ Endpoint de login funcionando (401 = credenciais inválidas)');
    } else if (response.status === 200) {
      console.log('✅ Login bem-sucedido!');
    }
  } catch (error) {
    console.error('❌ Erro no endpoint de login:', error.message);
  }
  
  // Teste 3: Testar endpoint público de doações
  try {
    console.log('3️⃣ Testando endpoint de doações...');
    const response = await fetch(`${baseUrl}/doacoes`);
    const data = await response.json();
    console.log('📦 Doações:', response.status, data);
    
    if (response.status === 200) {
      console.log(`✅ Encontradas ${data.length} doações públicas`);
    }
  } catch (error) {
    console.error('❌ Erro no endpoint de doações:', error.message);
  }
  
  // Teste 4: Verificar CORS
  try {
    console.log('4️⃣ Testando CORS...');
    const response = await fetch(baseUrl, {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('🌐 CORS:', response.status);
    console.log('🌐 Headers CORS:', response.headers);
  } catch (error) {
    console.error('❌ Problema de CORS:', error.message);
  }
  
  console.log('🏁 Testes de conectividade concluídos!');
}

// Para executar no console do navegador:
// testarBackend();

// Para uso em desenvolvimento:
if (typeof window !== 'undefined') {
  window.testarBackend = testarBackend;
}

export { testarBackend };
