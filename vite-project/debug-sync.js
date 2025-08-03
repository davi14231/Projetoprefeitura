// Teste de Sincronização - Análise de Problemas
// Executar no console do navegador para debug

console.log('=== TESTE DE SINCRONIZAÇÃO ===');

// 1. Verificar se o DataStore existe
if (window.dataStore) {
    console.log('✅ DataStore encontrado');
    console.log('Total de doações:', window.dataStore.getDoacoes().length);
} else {
    console.log('❌ DataStore não encontrado');
}

// 2. Testar adição de doação
const testDoacao = {
    titulo: "Teste de Sincronização",
    categoria: "Teste",
    ong: "ONG Teste",
    descricao: "Teste para verificar sincronização",
    quantidade: 1,
    email: "teste@teste.com",
    whatsapp: "(11) 99999-9999",
    urgencia: "Baixa",
    imageUrl: "/imagens/teste.jpg"
};

console.log('Adicionando doação de teste...');
if (window.dataStore) {
    const result = window.dataStore.addDoacao(testDoacao);
    console.log('Resultado da adição:', result);
    console.log('Total após adição:', window.dataStore.getDoacoes().length);
}

// 3. Verificar dados paginados
if (window.dataStore) {
    const paginatedData = window.dataStore.getDoacoesPaginadas(1, 6);
    console.log('Dados paginados página 1:', paginatedData);
}

console.log('=== FIM DO TESTE ===');
