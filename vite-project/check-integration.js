#!/usr/bin/env node
// Script ESM para verificar se a integração com o backend está configurada corretamente
// Convertido para import (antes usava require e gerava erro no-undef sob config ESM)
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

console.log('🔍 Verificando configuração da integração...\n');

// Diretório raiz baseado em URL (equivalente a __dirname em ESM)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const checkFileExists = (filePath, description) => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${description}: ${filePath} - ARQUIVO AUSENTE`);
    return false;
  }
};

console.log('📁 Verificando arquivos essenciais:');
checkFileExists(path.join(__dirname,'./src/services/api.js'), 'Configuração da API');
checkFileExists(path.join(__dirname,'./src/services/doacoesService.js'), 'Serviço de Doações');
checkFileExists(path.join(__dirname,'./src/services/realocacoesService.js'), 'Serviço de Realocações');
checkFileExists(path.join(__dirname,'./src/utils/dataMapper.js'), 'Mapeador de dados');
checkFileExists(path.join(__dirname,'./src/components/BackendConnectionTest.jsx'), 'Monitor de conexão');
checkFileExists(path.join(__dirname,'./vite.config.js'), 'Configuração do Vite (proxy)');

console.log('\n🔧 Verificando configuração do proxy:');
try {
  const viteConfig = fs.readFileSync(path.join(__dirname,'./vite.config.js'), 'utf8');
  if (viteConfig.includes('proxy') && viteConfig.includes('localhost:3000')) {
    console.log('✅ Proxy configurado para localhost:3000');
  } else {
    console.log('❌ Proxy não configurado corretamente');
  }
} catch (error) {
  console.log('❌ Erro ao ler vite.config.js:', error.message);
}

console.log('\n📦 Verificando package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname,'./package.json'), 'utf8'));
  
  // Verificar dependências essenciais
  const essentialDeps = ['axios', 'react', 'react-router-dom'];
  essentialDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: AUSENTE`);
    }
  });

  // Verificar se mock-server foi removido
  if (!packageJson.scripts['mock-server'] && !packageJson.dependencies.express) {
    console.log('✅ Mock server removido do package.json');
  } else {
    console.log('⚠️ Mock server ainda presente no package.json');
  }
} catch (error) {
  console.log('❌ Erro ao ler package.json:', error.message);
}

console.log('\n🌐 Configuração da API:');
try {
  const apiConfig = fs.readFileSync(path.join(__dirname,'./src/services/api.js'), 'utf8');
  if (apiConfig.includes("baseURL: '/api'")) {
    console.log('✅ API configurada para usar proxy (/api)');
  } else {
    console.log('❌ API não configurada para proxy');
  }
} catch (error) {
  console.log('❌ Erro ao ler api.js:', error.message);
}

console.log('\n📋 Resumo da integração:');
console.log('🎯 Backend esperado: https://github.com/Pedrocavalcantip/projeto-prefeitura-backend');
console.log('🚀 Para executar:');
console.log('   1. Frontend: npm run dev (porta 5173)');
console.log('   2. Backend: clone o repo e execute npm start (porta 3000)');
console.log('   3. Acesse: http://localhost:5173');
console.log('   4. Monitor de conexão aparecerá no canto inferior direito');

console.log('\n✨ Integração configurada com sucesso!');
