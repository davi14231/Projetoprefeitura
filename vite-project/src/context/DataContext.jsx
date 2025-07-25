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

    // Cleanup: remover listener quando o componente for desmontado
    return () => {
      dataStore.removeListener(handleStoreChange);
    };
  }, []);

  // Métodos para doações
  const addDoacao = (doacao) => {
    return dataStore.addDoacao(doacao);
  };

  const removeDoacao = (id) => {
    dataStore.removeDoacao(id);
  };

  const updateDoacao = (id, updates) => {
    dataStore.updateDoacao(id, updates);
  };

  const getDoacoesPaginadas = ({ page = 1, limit = 6, filters = {} } = {}) => {
    return dataStore.getDoacoesPaginadas(page, limit);
  };

  const filterDoacoes = (filters) => {
    return dataStore.filterDoacoes(filters);
  };

  // Métodos para realocações
  const addRealocacao = (realocacao) => {
    return dataStore.addRealocacao(realocacao);
  };

  const removeRealocacao = (id) => {
    dataStore.removeRealocacao(id);
  };

  const updateRealocacao = (id, updates) => {
    dataStore.updateRealocacao(id, updates);
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

  // Métodos de exclusão
  const deleteDoacao = (id) => {
    // Chama o método do dataStore que realmente remove do "banco de dados"
    dataStore.removeDoacao(id);
    
    // Atualiza também o estado local para atualização imediata da UI
    setDoacoes(prevDoacoes => prevDoacoes.filter(doacao => doacao.id !== id));
  };

  const deleteRealocacao = (id) => {
    // Chama o método do dataStore que realmente remove do "banco de dados"
    dataStore.removeRealocacao(id);
    
    // Atualiza também o estado local para atualização imediata da UI
    setRealocacoes(prevRealocacoes => prevRealocacoes.filter(realocacao => realocacao.id !== id));
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
    getDoacoesPaginadas,
    filterDoacoes,

    // Métodos de realocações
    addRealocacao,
    removeRealocacao,
    updateRealocacao,
    getRealocacoesPaginadas,
    filterRealocacoes,

    // Métodos de exclusão
    deleteDoacao,
    deleteRealocacao,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
