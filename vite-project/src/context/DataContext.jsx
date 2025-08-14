import React, { createContext, useContext, useState, useEffect } from 'react';
// Usar alias para facilitar mocking consistente nos testes
import { doacoesService } from '@/services/doacoesService';
import { realocacoesService } from '@/services/realocacoesService';

// Criar o Context
const DataContext = createContext();

// Hook personalizado para usar o Context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};

// Provider do Context
export const DataProvider = ({ children }) => {
  const [doacoes, setDoacoes] = useState([]);
  const [doacoesPrestesVencer, setDoacoesPrestesVencer] = useState([]); // Lista destacada
  const [minhasDoacoes, setMinhasDoacoes] = useState([]); // Estado separado para minhas doações
  const [realocacoes, setRealocacoes] = useState([]);
  const [minhasRealocacoes, setMinhasRealocacoes] = useState([]); // Estado separado para minhas realocações
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Função para forçar atualização dos componentes
  const triggerUpdate = () => {
    setForceUpdate(prev => prev + 1);
  };

  // Carregar dados iniciais - com tratamento de erro melhorado
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadDoacoes();
        await loadRealocacoes();
  await loadDoacoesPrestesVencer();
      } catch (error) {
        console.warn('Erro ao carregar dados iniciais:', error);
        // Não quebrar a aplicação se houver erro na API
      }
    };
    
    loadInitialData();
  }, []);

  // Função para carregar minhas doações (com dados de contato)
  const loadMinhasDoacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiDoacoes = await doacoesService.listarMinhasDoacoes();
      console.log('🔍 Minhas doações carregadas:', apiDoacoes);
      setMinhasDoacoes(Array.isArray(apiDoacoes) ? apiDoacoes : []);
      setApiConnected(true);
    } catch (error) {
      console.error('Erro ao carregar minhas doações:', error);
      setError('Erro ao carregar suas doações da API');
      setMinhasDoacoes([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar doações
  const loadDoacoes = async (filtros = {}) => {
    setLoading(true);
    setError(null);
    try {
      const apiDoacoes = await doacoesService.listarDoacoes(filtros);
      setDoacoes(Array.isArray(apiDoacoes) ? apiDoacoes : []);
      setApiConnected(true);
    } catch (error) {
      console.error('Erro ao carregar doações:', error);
      setError('Erro ao carregar doações da API');
      setDoacoes([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar doações prestes a vencer (SEM fallback local)
  const loadDoacoesPrestesVencer = async () => {
    setError(null);
    try {
      const apiLista = await doacoesService.listarDoacoesPrestesVencer();
      setDoacoesPrestesVencer(Array.isArray(apiLista) ? apiLista : []);
    } catch (error) {
      console.error('Erro ao carregar doações prestes a vencer:', error);
      setDoacoesPrestesVencer([]);
    }
  };

  // Função para carregar realocações
  const loadRealocacoes = async (filtros = {}) => {
    setLoading(true);
    setError(null);
    try {
      const apiRealocacoes = await realocacoesService.listarRealocacoes(filtros);
      setRealocacoes(Array.isArray(apiRealocacoes) ? apiRealocacoes : []);
      setApiConnected(true);
    } catch (error) {
      console.error('Erro ao carregar realocações:', error);
      setError('Erro ao carregar realocações da API');
      setRealocacoes([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar minhas realocações (com dados de contato)
  const loadMinhasRealocacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiRealocacoes = await realocacoesService.listarMinhasRealocacoes();
      console.log('🔍 Minhas realocações carregadas:', apiRealocacoes);
      setMinhasRealocacoes(Array.isArray(apiRealocacoes) ? apiRealocacoes : []);
      setApiConnected(true);
    } catch (error) {
      console.error('Erro ao carregar minhas realocações:', error);
      setError('Erro ao carregar suas realocações da API');
      setMinhasRealocacoes([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Verificar conexão com API
  const checkApiConnection = async () => {
    try {
      const response = await doacoesService.listarDoacoes();
      setApiConnected(true);
      return true;
    } catch (error) {
      setApiConnected(false);
      return false;
    }
  };

  // === MÉTODOS PARA DOAÇÕES ===
  const addDoacao = async (doacao) => {
    try {
      console.log('🆕 Adicionando doação:', doacao);
      const result = await doacoesService.criarDoacao(doacao);
      console.log('✅ Doação criada, recarregando listas...');
      await loadDoacoes(); // Recarregar doações públicas
      await loadMinhasDoacoes(); // Recarregar minhas doações
      await loadDoacoesPrestesVencer(); // Recarregar destaque
      triggerUpdate(); // Forçar atualização dos componentes
      console.log('🔄 Listas atualizadas');
      return result;
    } catch (error) {
      console.error('❌ Erro ao adicionar doação:', error);
      setError('Erro ao adicionar doação');
      throw error;
    }
  };

  const removeDoacao = async (id) => {
    try {
      await doacoesService.deletarDoacao(id);
      await loadDoacoes(); // Recarregar doações públicas
      await loadMinhasDoacoes(); // Recarregar minhas doações
      triggerUpdate(); // Forçar atualização dos componentes
    } catch (error) {
      console.error('Erro ao remover doação:', error);
      setError('Erro ao remover doação');
      throw error;
    }
  };

  const updateDoacao = async (id, dadosAtualizados) => {
    try {
      console.log('🔄 Atualizando doação:', id, dadosAtualizados);
      await doacoesService.editarDoacao(id, dadosAtualizados);
      console.log('✅ Doação atualizada, recarregando listas...');
      await loadDoacoes(); // Recarregar doações públicas
      await loadMinhasDoacoes(); // Recarregar minhas doações
      await loadDoacoesPrestesVencer(); // Recarregar destaque
      triggerUpdate(); // Forçar atualização dos componentes
      console.log('🔁 Listas de doações recarregadas');
    } catch (error) {
      console.error('❌ Erro ao atualizar doação:', error);
      setError('Erro ao atualizar doação');
      throw error;
    }
  };

  const encerrarDoacao = async (id) => {
    try {
      await doacoesService.alterarStatus(id, 'FINALIZADA');
      await loadDoacoes(); // Recarregar doações públicas
      await loadMinhasDoacoes(); // Recarregar minhas doações
      await loadDoacoesPrestesVencer(); // Recarregar destaque
      triggerUpdate(); // Forçar atualização dos componentes
    } catch (error) {
      console.error('Erro ao encerrar doação:', error);
      setError('Erro ao encerrar doação');
      throw error;
    }
  };

  // === MÉTODOS PARA REALOCAÇÕES ===
  const addRealocacao = async (realocacao) => {
    try {
      console.log('🆕 Adicionando realocação:', realocacao);
      const result = await realocacoesService.criarRealocacao(realocacao);
      console.log('✅ Realocação criada, recarregando listas...');
      await loadRealocacoes(); // Recarregar realocações públicas
      await loadMinhasRealocacoes(); // Recarregar minhas realocações
      triggerUpdate(); // Forçar atualização dos componentes
      console.log('🔄 Listas atualizadas');
      return result;
    } catch (error) {
      console.error('❌ Erro ao adicionar realocação:', error);
      setError('Erro ao adicionar realocação');
      throw error;
    }
  };

  const removeRealocacao = async (id) => {
    try {
      await realocacoesService.deletarRealocacao(id);
      await loadRealocacoes(); // Recarregar realocações públicas
      await loadMinhasRealocacoes(); // Recarregar minhas realocações
      triggerUpdate(); // Forçar atualização dos componentes
    } catch (error) {
      console.error('Erro ao remover realocação:', error);
      setError('Erro ao remover realocação');
      throw error;
    }
  };

  const updateRealocacao = async (id, dadosAtualizados) => {
    try {
      console.log('🔄 Atualizando realocação:', id, dadosAtualizados);
      await realocacoesService.editarRealocacao(id, dadosAtualizados);
      console.log('✅ Realocação atualizada, recarregando listas...');
      await loadRealocacoes(); // Recarregar realocações públicas
      await loadMinhasRealocacoes(); // Recarregar minhas realocações
      triggerUpdate(); // Forçar atualização dos componentes
      console.log('🔁 Listas de realocações recarregadas');
    } catch (error) {
      console.error('❌ Erro ao atualizar realocação:', error);
      setError('Erro ao atualizar realocação');
      throw error;
    }
  };

  const encerrarRealocacao = async (id) => {
    try {
      await realocacoesService.alterarStatus(id, 'FINALIZADA');
      await loadRealocacoes(); // Recarregar realocações públicas
      await loadMinhasRealocacoes(); // Recarregar minhas realocações
      triggerUpdate(); // Forçar atualização dos componentes
    } catch (error) {
      console.error('Erro ao encerrar realocação:', error);
      setError('Erro ao encerrar realocação');
      throw error;
    }
  };

  // === MÉTODOS DE PAGINAÇÃO ===
  const getDoacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6, filters = {} } = options;
    let doacoesFiltradas = [...doacoes];
    
    // Aplicar filtro de categoria se fornecido
    if (filters.categoria && filters.categoria !== 'Todos') {
      doacoesFiltradas = doacoesFiltradas.filter(doacao => 
        doacao.categoria === filters.categoria
      );
    }
    
    // Aplicar filtro de busca por termo se fornecido
    if (filters.termo && filters.termo.trim() !== '') {
      const termo = filters.termo.toLowerCase();
      doacoesFiltradas = doacoesFiltradas.filter(doacao =>
        doacao.titulo?.toLowerCase().includes(termo) ||
        doacao.categoria?.toLowerCase().includes(termo) ||
        doacao.ong?.toLowerCase().includes(termo)
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = doacoesFiltradas.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(doacoesFiltradas.length / limit),
      totalItems: doacoesFiltradas.length,
      total: doacoesFiltradas.length,
      hasNextPage: endIndex < doacoesFiltradas.length,
      hasPrevPage: page > 1
    };
  };

  const getRealocacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6, filters = {} } = options;
    let realocacoesFiltradas = [...realocacoes];
    
    // Aplicar filtro de categoria se fornecido
    if (filters.categoria && filters.categoria !== 'Todos') {
      realocacoesFiltradas = realocacoesFiltradas.filter(realocacao => 
        realocacao.categoria === filters.categoria
      );
    }
    
    // Aplicar filtro de busca por termo se fornecido
    if (filters.termo && filters.termo.trim() !== '') {
      const termo = filters.termo.toLowerCase();
      realocacoesFiltradas = realocacoesFiltradas.filter(realocacao =>
        realocacao.titulo?.toLowerCase().includes(termo) ||
        realocacao.categoria?.toLowerCase().includes(termo) ||
        realocacao.ong?.toLowerCase().includes(termo)
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = realocacoesFiltradas.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(realocacoesFiltradas.length / limit),
      totalItems: realocacoesFiltradas.length,
      total: realocacoesFiltradas.length,
      hasNextPage: endIndex < realocacoesFiltradas.length,
      hasPrevPage: page > 1
    };
  };

  // Paginação para MINHAS doações (usado na tela EditDoacoes)
  const getMinhasDoacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6 } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = minhasDoacoes.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(minhasDoacoes.length / limit),
      totalItems: minhasDoacoes.length,
      total: minhasDoacoes.length,
      hasNextPage: endIndex < minhasDoacoes.length,
      hasPrevPage: page > 1
    };
  };

  // Paginação para MINHAS realocações (usado na tela HomeRealocacao) - SEM FILTROS
  const getMinhasRealocacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6 } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = minhasRealocacoes.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(minhasRealocacoes.length / limit),
      totalItems: minhasRealocacoes.length,
      total: minhasRealocacoes.length,
      hasNextPage: endIndex < minhasRealocacoes.length,
      hasPrevPage: page > 1
    };
  };

  // === FUNÇÕES UTILITÁRIAS ===
  const refreshData = async () => {
    await loadDoacoes();
    await loadRealocacoes();
  };

  // Filtrar doações por categoria
  const getDoacoesPorCategoria = (categoria) => {
    return doacoes.filter(doacao => 
      categoria === 'Todos' || doacao.categoria === categoria
    );
  };

  // Filtrar realocações por categoria
  const getRealocacoesPorCategoria = (categoria) => {
    return realocacoes.filter(realocacao => 
      categoria === 'Todos' || realocacao.categoria === categoria
    );
  };

  // Buscar doações por termo
  const searchDoacoes = (termo) => {
    if (!termo) return doacoes;
    return doacoes.filter(doacao =>
      doacao.titulo?.toLowerCase().includes(termo.toLowerCase()) ||
      doacao.categoria?.toLowerCase().includes(termo.toLowerCase()) ||
      doacao.ong?.toLowerCase().includes(termo.toLowerCase())
    );
  };

  // Buscar realocações por termo
  const searchRealocacoes = (termo) => {
    if (!termo) return realocacoes;
    return realocacoes.filter(realocacao =>
      realocacao.titulo?.toLowerCase().includes(termo.toLowerCase()) ||
      realocacao.categoria?.toLowerCase().includes(termo.toLowerCase()) ||
      realocacao.ong?.toLowerCase().includes(termo.toLowerCase())
    );
  };

  // Valor do contexto
  const value = {
    // Estados
    doacoes,
    realocacoes,
    loading,
    error,
    apiConnected,
    forceUpdate,
  doacoesPrestesVencer,
    
    // Métodos para doações
    addDoacao,
    removeDoacao,
    updateDoacao,
    encerrarDoacao,
    getDoacoesPaginadas,
    getMinhasDoacoesPaginadas, // Nova função para minhas doações
    
    // Métodos para realocações
    addRealocacao,
    removeRealocacao,
    updateRealocacao,
    encerrarRealocacao,
    getRealocacoesPaginadas,
    getMinhasRealocacoesPaginadas, // Nova função para minhas realocações
    
    // Métodos de busca e filtro
    getDoacoesPorCategoria,
    getRealocacoesPorCategoria,
    searchDoacoes,
    searchRealocacoes,
    
    // Utilitários
    loadDoacoes,
    loadMinhasDoacoes,
  loadDoacoesPrestesVencer,
    loadRealocacoes,
    loadMinhasRealocacoes,
    refreshData,
    checkApiConnection,
    triggerUpdate,
    clearError: () => setError(null)
  };

  // Auto limpar mensagem de sucesso após 3 segundos

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
