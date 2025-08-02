import React, { createContext, useContext, useState, useEffect } from 'react';
import dataStore from '../store/DataStore';

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
  const [doacoes, setDoacoes] = useState(dataStore.getDoacoes());
  const [realocacoes, setRealocacoes] = useState(dataStore.getRealocacoes());
  const [forceUpdate, setForceUpdate] = useState(0);

  // Função para forçar atualização quando o store muda
  const handleStoreChange = () => {
    setDoacoes(dataStore.getDoacoes());
    setRealocacoes(dataStore.getRealocacoes());
    setForceUpdate(prev => prev + 1);
  };

  useEffect(() => {
    // Adicionar listener para mudanças no store
    dataStore.addListener(handleStoreChange);

    // Atualização inicial
    handleStoreChange();

    // Cleanup: remover listener quando o componente for desmontado
    return () => {
      dataStore.removeListener(handleStoreChange);
    };
  }, []);

  // Métodos para doações
  const addDoacao = (doacao) => {
    const result = dataStore.addDoacao(doacao);
    // Forçar atualização imediata
    setForceUpdate(prev => prev + 1);
    return result;
  };

  const removeDoacao = (id) => {
    dataStore.removeDoacao(id);
  };

  const updateDoacao = (id, updates) => {
    dataStore.updateDoacao(id, updates);
  };

  const encerrarDoacao = (id) => {
    dataStore.updateDoacao(id, { encerrado: true });
  };

  const getDoacoesPaginadas = (pageOrOptions = 1, itemsPerPage = 6) => {
    // Aceitar tanto objeto quanto parâmetros separados
    if (typeof pageOrOptions === 'object') {
      const { page = 1, limit = 6 } = pageOrOptions;
      return dataStore.getDoacoesPaginadas(page, limit);
    }
    return dataStore.getDoacoesPaginadas(pageOrOptions, itemsPerPage);
  };

  const filterDoacoes = (filters) => {
    return dataStore.filterDoacoes(filters);
  };

  // Métodos para realocações
  const addRealocacao = (realocacao) => {
    const result = dataStore.addRealocacao(realocacao);
    // Forçar atualização imediata
    setForceUpdate(prev => prev + 1);
    return result;
  };

  const removeRealocacao = (id) => {
    dataStore.removeRealocacao(id);
  };

  const updateRealocacao = (id, updates) => {
    dataStore.updateRealocacao(id, updates);
  };

  const encerrarRealocacao = (id) => {
    dataStore.updateRealocacao(id, { encerrado: true });
  };

  const getRealocacoesPaginadas = (pageOrOptions = 1, itemsPerPage = 6) => {
    // Aceitar tanto objeto quanto parâmetros separados
    if (typeof pageOrOptions === 'object') {
      const { page = 1, limit = 6 } = pageOrOptions;
      return dataStore.getRealocacoesPaginadas(page, limit);
    }
    return dataStore.getRealocacoesPaginadas(pageOrOptions, itemsPerPage);
  };

  const filterRealocacoes = (filters) => {
    return dataStore.filterRealocacoes(filters);
  };

  const value = {
    // Dados
    doacoes,
    realocacoes,
    forceUpdate,

    // Métodos de doações
    addDoacao,
    removeDoacao,
    updateDoacao,
    encerrarDoacao,
    getDoacoesPaginadas,
    filterDoacoes,

    // Métodos de realocações
    addRealocacao,
    removeRealocacao,
    updateRealocacao,
    encerrarRealocacao,
    getRealocacoesPaginadas,
    filterRealocacoes,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
