import React, { createContext, useContext, useState, useEffect } from 'react';
import { doacoesService } from '../services/doacoesService';
import { realocacoesService } from '../services/realocacoesService';
import dataStore from '../store/DataStore'; // Fallback para dados locais

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
  const [forceUpdate, setForceUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [useLocalData, setUseLocalData] = useState(false); // ✅ USANDO API

  // Carregar dados iniciais
  useEffect(() => {
    loadDoacoes();
    loadRealocacoes();
  }, [useLocalData]);

  // Função para carregar doações
  const loadDoacoes = async (filtros = {}) => {
    setLoading(true);
    try {
      if (useLocalData) {
        // Usar dados locais (fallback)
        const localDoacoes = dataStore.getDoacoes();
        setDoacoes(localDoacoes);
      } else {
        // Usar API
        const apiDoacoes = await doacoesService.listarDoacoes(filtros);
        setDoacoes(Array.isArray(apiDoacoes) ? apiDoacoes : []);
      }
    } catch (error) {
      console.error('Erro ao carregar doações:', error);
      // Fallback para dados locais em caso de erro
      setDoacoes(dataStore.getDoacoes());
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar realocações
  const loadRealocacoes = async (filtros = {}) => {
    setLoading(true);
    try {
      if (useLocalData) {
        // Usar dados locais (fallback)
        const localRealocacoes = dataStore.getRealocacoes();
        setRealocacoes(localRealocacoes);
      } else {
        // Usar API
        const apiRealocacoes = await realocacoesService.listarRealocacoes(filtros);
        setRealocacoes(Array.isArray(apiRealocacoes) ? apiRealocacoes : []);
      }
    } catch (error) {
      console.error('Erro ao carregar realocações:', error);
      // Fallback para dados locais em caso de erro
      setRealocacoes(dataStore.getRealocacoes());
    } finally {
      setLoading(false);
    }
  };

  // === MÉTODOS PARA DOAÇÕES ===
  const addDoacao = async (doacao) => {
    try {
      if (useLocalData) {
        const result = dataStore.addDoacao(doacao);
        setDoacoes(dataStore.getDoacoes());
        setForceUpdate(prev => prev + 1);
        return result;
      } else {
        const result = await doacoesService.criarDoacao(doacao);
        await loadDoacoes();
        return result;
      }
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      throw error;
    }
  };

  const removeDoacao = async (id) => {
    try {
      if (useLocalData) {
        dataStore.removeDoacao(id);
        setDoacoes(dataStore.getDoacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await doacoesService.deletarDoacao(id);
        await loadDoacoes();
      }
    } catch (error) {
      console.error('Erro ao remover doação:', error);
      throw error;
    }
  };

  const updateDoacao = async (id, dadosAtualizados) => {
    try {
      if (useLocalData) {
        dataStore.updateDoacao(id, dadosAtualizados);
        setDoacoes(dataStore.getDoacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await doacoesService.editarDoacao(id, dadosAtualizados);
        await loadDoacoes();
      }
    } catch (error) {
      console.error('Erro ao atualizar doação:', error);
      throw error;
    }
  };

  const encerrarDoacao = async (id) => {
    try {
      if (useLocalData) {
        dataStore.encerrarDoacao(id);
        setDoacoes(dataStore.getDoacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await doacoesService.alterarStatus(id, 'FINALIZADA');
        await loadDoacoes();
      }
    } catch (error) {
      console.error('Erro ao encerrar doação:', error);
      throw error;
    }
  };

  // === MÉTODOS PARA REALOCAÇÕES ===
  const addRealocacao = async (realocacao) => {
    try {
      if (useLocalData) {
        const result = dataStore.addRealocacao(realocacao);
        setRealocacoes(dataStore.getRealocacoes());
        setForceUpdate(prev => prev + 1);
        return result;
      } else {
        const result = await realocacoesService.criarRealocacao(realocacao);
        await loadRealocacoes();
        return result;
      }
    } catch (error) {
      console.error('Erro ao adicionar realocação:', error);
      throw error;
    }
  };

  const removeRealocacao = async (id) => {
    try {
      if (useLocalData) {
        dataStore.removeRealocacao(id);
        setRealocacoes(dataStore.getRealocacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await realocacoesService.deletarRealocacao(id);
        await loadRealocacoes();
      }
    } catch (error) {
      console.error('Erro ao remover realocação:', error);
      throw error;
    }
  };

  const updateRealocacao = async (id, dadosAtualizados) => {
    try {
      if (useLocalData) {
        dataStore.updateRealocacao(id, dadosAtualizados);
        setRealocacoes(dataStore.getRealocacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await realocacoesService.editarRealocacao(id, dadosAtualizados);
        await loadRealocacoes();
      }
    } catch (error) {
      console.error('Erro ao atualizar realocação:', error);
      throw error;
    }
  };

  const encerrarRealocacao = async (id) => {
    try {
      if (useLocalData) {
        dataStore.encerrarRealocacao(id);
        setRealocacoes(dataStore.getRealocacoes());
        setForceUpdate(prev => prev + 1);
      } else {
        await realocacoesService.alterarStatus(id, 'FINALIZADA');
        await loadRealocacoes();
      }
    } catch (error) {
      console.error('Erro ao encerrar realocação:', error);
      throw error;
    }
  };

  // === MÉTODOS DE PAGINAÇÃO (compatibilidade) ===
  const getDoacoesPaginadas = (options = {}) => {
    if (useLocalData) {
      return dataStore.getDoacoesPaginadas(options);
    } else {
      // Para API, implementar paginação aqui ou retornar dados já carregados
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
    }
  };

  const getRealocacoesPaginadas = (options = {}) => {
    if (useLocalData) {
      return dataStore.getRealocacoesPaginadas(options);
    } else {
      // Para API, implementar paginação aqui ou retornar dados já carregados
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
    }
  };

  // === FUNÇÕES UTILITÁRIAS ===
  const toggleDataSource = () => {
    setUseLocalData(prev => !prev);
  };

  const refreshData = async () => {
    await loadDoacoes();
    await loadRealocacoes();
  };

  // Valor do contexto
  const value = {
    // Estados
    doacoes,
    realocacoes,
    loading,
    forceUpdate,
    useLocalData,
    
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
    
    // Utilitários
    loadDoacoes,
    loadRealocacoes,
    toggleDataSource,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
