import React, { useState } from 'react';
import api from '../services/api';

export const NetworkDiagnostic = () => {
  const [result, setResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    setResult('🔍 Testando diferentes configurações...\n');
    
    // Testar diferentes URLs base
    const baseUrls = [
      'http://localhost:3000',
      'http://localhost:3000/api',
      'http://localhost:8000',
      'http://localhost:5000'
    ];
    
    // Testar diferentes endpoints de login
    const loginEndpoints = [
      '/auth/login',
      '/api/auth/login', 
      '/login'
    ];
    
    try {
      // Teste 1: Verificar se backend está rodando
      setResult(prev => prev + '1️⃣ Testando se backend está rodando...\n');
      
      for (const baseUrl of baseUrls) {
        try {
          const response = await fetch(baseUrl);
          setResult(prev => prev + `✅ ${baseUrl}: Backend respondendo (${response.status})\n`);
          break;
        } catch (error) {
          setResult(prev => prev + `❌ ${baseUrl}: ${error.message}\n`);
        }
      }
      
      // Teste 2: Testar endpoints de login
      setResult(prev => prev + '\n2️⃣ Testando endpoints de login...\n');
      
      for (const baseUrl of ['http://localhost:3000']) {
        for (const endpoint of loginEndpoints) {
          try {
            setResult(prev => prev + `   Testando: ${baseUrl}${endpoint}\n`);
            
            const response = await fetch(`${baseUrl}${endpoint}`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                email_ong: 'ong1@gmail.com',
                password: '123456'
              })
            });
            
            const data = await response.text();
            
            if (response.status === 404) {
              setResult(prev => prev + `   ❌ 404 - Endpoint não existe\n`);
            } else if (response.status === 401) {
              setResult(prev => prev + `   ✅ Endpoint existe! (401 = credenciais inválidas)\n`);
            } else if (response.status === 400) {
              setResult(prev => prev + `   ✅ Endpoint existe! (400 = dados inválidos)\n`);
            } else if (response.status === 200) {
              setResult(prev => prev + `   ✅ Login funcionou!\n`);
              setResult(prev => prev + `   Response: ${data.substring(0, 100)}...\n`);
            } else {
              setResult(prev => prev + `   ⚠️ Status ${response.status}: ${data.substring(0, 50)}...\n`);
            }
            
          } catch (error) {
            setResult(prev => prev + `   ❌ Erro: ${error.message}\n`);
          }
        }
      }
      
      // Teste 3: Verificar se é problema de CORS
      setResult(prev => prev + '\n3️⃣ Verificando CORS...\n');
      try {
        const response = await fetch('http://localhost:3000', {
          method: 'OPTIONS',
          headers: {
            'Origin': 'http://localhost:5173',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
          }
        });
        setResult(prev => prev + `✅ CORS: ${response.status}\n`);
      } catch (error) {
        setResult(prev => prev + `❌ CORS problema: ${error.message}\n`);
      }
      
    } catch (error) {
      setResult(prev => prev + `❌ Erro geral: ${error.message}\n`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">🔧 Diagnóstico de Rede</h3>
      <button
        onClick={testConnection}
        disabled={testing}
        className="mb-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {testing ? 'Testando...' : 'Testar Conexão'}
      </button>
      {result && (
        <pre className="text-xs text-gray-600 bg-white p-2 rounded border whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
};

export default NetworkDiagnostic;
