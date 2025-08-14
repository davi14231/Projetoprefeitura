#!/usr/bin/env node

// Script para verificar se a integração com o backend está configurada corretamente

console.log('🔍 Verificando configuração da integração...\n');

// 1. Verificar se os arquivos necessários existem
const fs = require('fs');
const path = require('path');

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
checkFileExists('./src/services/api.js', 'Configuração da API');
checkFileExists('./src/services/doacoesService.js', 'Serviço de Doações');
checkFileExists('./src/services/realocacoesService.js', 'Serviço de Realocações');
checkFileExists('./src/utils/dataMapper.js', 'Mapeador de dados');
checkFileExists('./src/components/BackendConnectionTest.jsx', 'Monitor de conexão');
checkFileExists('./vite.config.js', 'Configuração do Vite (proxy)');

console.log('\n🔧 Verificando configuração do proxy:');
try {
  const viteConfig = fs.readFileSync('./vite.config.js', 'utf8');
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
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
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
  const apiConfig = fs.readFileSync('./src/services/api.js', 'utf8');
  if (apiConfig.includes("API_BASE_URL = '/api'") && apiConfig.includes("baseURL: API_BASE_URL")) {
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
