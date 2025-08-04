import React, { createContext, useContext, useState, useEffect } from 'react';
import { doacoesService } from '../services/doacoesService';
import { realocacoesService } from '../services/realocacoesService';

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
  const [realocacoes, setRealocacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    loadDoacoes();
    loadRealocacoes();
  }, []);

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
      const result = await doacoesService.criarDoacao(doacao);
      await loadDoacoes();
      return result;
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      setError('Erro ao adicionar doação');
      throw error;
    }
  };

  const removeDoacao = async (id) => {
    try {
      await doacoesService.deletarDoacao(id);
      await loadDoacoes();
    } catch (error) {
      console.error('Erro ao remover doação:', error);
      setError('Erro ao remover doação');
      throw error;
    }
  };

  const updateDoacao = async (id, dadosAtualizados) => {
    try {
      await doacoesService.editarDoacao(id, dadosAtualizados);
      await loadDoacoes();
    } catch (error) {
      console.error('Erro ao atualizar doação:', error);
      setError('Erro ao atualizar doação');
      throw error;
    }
  };

  const encerrarDoacao = async (id) => {
    try {
      await doacoesService.alterarStatus(id, 'FINALIZADA');
      await loadDoacoes();
    } catch (error) {
      console.error('Erro ao encerrar doação:', error);
      setError('Erro ao encerrar doação');
      throw error;
    }
  };

  // === MÉTODOS PARA REALOCAÇÕES ===
  const addRealocacao = async (realocacao) => {
    try {
      const result = await realocacoesService.criarRealocacao(realocacao);
      await loadRealocacoes();
      return result;
    } catch (error) {
      console.error('Erro ao adicionar realocação:', error);
      setError('Erro ao adicionar realocação');
      throw error;
    }
  };

  const removeRealocacao = async (id) => {
    try {
      await realocacoesService.deletarRealocacao(id);
      await loadRealocacoes();
    } catch (error) {
      console.error('Erro ao remover realocação:', error);
      setError('Erro ao remover realocação');
      throw error;
    }
  };

  const updateRealocacao = async (id, dadosAtualizados) => {
    try {
      await realocacoesService.editarRealocacao(id, dadosAtualizados);
      await loadRealocacoes();
    } catch (error) {
      console.error('Erro ao atualizar realocação:', error);
      setError('Erro ao atualizar realocação');
      throw error;
    }
  };

  const encerrarRealocacao = async (id) => {
    try {
      await realocacoesService.alterarStatus(id, 'FINALIZADA');
      await loadRealocacoes();
    } catch (error) {
      console.error('Erro ao encerrar realocação:', error);
      setError('Erro ao encerrar realocação');
      throw error;
    }
  };

  // === MÉTODOS DE PAGINAÇÃO ===
  const getDoacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6 } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = doacoes.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(doacoes.length / limit),
      totalItems: doacoes.length,
      total: doacoes.length,
      hasNextPage: endIndex < doacoes.length,
      hasPrevPage: page > 1
    };
  };

  const getRealocacoesPaginadas = (options = {}) => {
    const { page = 1, limit = 6 } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = realocacoes.slice(startIndex, endIndex);
    
    return {
      items,
      currentPage: page,
      totalPages: Math.ceil(realocacoes.length / limit),
      totalItems: realocacoes.length,
      total: realocacoes.length,
      hasNextPage: endIndex < realocacoes.length,
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
    
    // Métodos para doações
    addDoacao,
    removeDoacao,
    updateDoacao,
    encerrarDoacao,
    getDoacoesPaginadas,
    
    // Métodos para realocações
    addRealocacao,
    removeRealocacao,
    updateRealocacao,
    encerrarRealocacao,
    getRealocacoesPaginadas,
    
    // Métodos de busca e filtro
    getDoacoesPorCategoria,
    getRealocacoesPorCategoria,
    searchDoacoes,
    searchRealocacoes,
    
    // Utilitários
    loadDoacoes,
    loadRealocacoes,
    refreshData,
    checkApiConnection,
    clearError: () => setError(null)
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
