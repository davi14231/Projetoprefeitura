import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [doacoes, setDoacoes] = useState([]);
  const [realocacoes, setRealocacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Verificar se está autenticado ao inicializar
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Função para login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(email, password);
      
      if (response.auth && response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        throw new Error(response.erro || 'Falha na autenticação');
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setDoacoes([]);
    setRealocacoes([]);
  };

  // MAPEAR DOAÇÃO DO BACKEND PARA FRONTEND
  const mapearDoacaoBackendParaFrontend = (doacao) => {
    return {
      id: doacao.id_produto,
      titulo: doacao.titulo,
      categoria: doacao.tipo_item,
      descricao: doacao.descricao,
      imageUrl: doacao.url_imagem,
      urgencia: doacao.urgencia,
      quantidade: doacao.quantidade,
      email: doacao.email,
      whatsapp: doacao.whatsapp,
      prazo: doacao.prazo_necessidade,
      status: doacao.status,
      publicado: new Date(doacao.criado_em).toLocaleDateString('pt-BR'),
      tempoRestante: calcularTempoRestante(doacao.prazo_necessidade),
      ong: doacao.ong
    };
  };

  // MAPEAR DOAÇÃO DO FRONTEND PARA BACKEND
  const mapearDoacaoFrontendParaBackend = (formData) => {
    return {
      titulo: formData.titulo,
      descricao: formData.descricao,
      tipo_item: formData.categoria,
      urgencia: formData.urgencia?.toUpperCase() || 'BAIXA',
      quantidade: parseInt(formData.quantidade) || 1,
      email: formData.email,
      whatsapp: formData.whatsapp.replace(/\D/g, ''), // Só números
      prazo_necessidade: formData.prazo,
      url_imagem: formData.imageUrl || undefined
    };
  };

  // CALCULAR TEMPO RESTANTE
  const calcularTempoRestante = (prazo) => {
    const hoje = new Date();
    const dataLimite = new Date(prazo);
    const diferenca = dataLimite - hoje;
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    
    if (dias < 0) return 'Expirado';
    if (dias === 0) return 'Hoje';
    if (dias === 1) return '1 dia';
    return `${dias} dias`;
  };

  // DOAÇÕES
  const getDoacoes = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getDoacoes(filters);
      const doacoesMapeadas = data.map(mapearDoacaoBackendParaFrontend);
      setDoacoes(doacoesMapeadas);
      return doacoesMapeadas;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getDoacoesPrestesAVencer = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getDoacoesPrestesAVencer();
      return data.map(mapearDoacaoBackendParaFrontend);
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getMinhasDoacoes = async (tipo = 'ativas') => {
    try {
      setLoading(true);
      setError(null);
      
      const data = tipo === 'ativas' 
        ? await apiService.getMinhasDoacoesAtivas()
        : await apiService.getMinhasDoacoesFinalizadas();
      
      return data.map(mapearDoacaoBackendParaFrontend);
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addDoacao = async (dadosDoacao, arquivo = null) => {
    try {
      setLoading(true);
      setError(null);

      const dadosParaAPI = mapearDoacaoFrontendParaBackend(dadosDoacao);

      const novaDoacao = await apiService.createDoacao(dadosParaAPI, arquivo);
      const doacaoMapeada = mapearDoacaoBackendParaFrontend(novaDoacao);
      
      // Atualizar lista local
      setDoacoes(prev => [doacaoMapeada, ...prev]);
      setForceUpdate(prev => prev + 1);
      
      return doacaoMapeada;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateDoacao = async (id, dadosDoacao, arquivo = null) => {
    try {
      setLoading(true);
      setError(null);

      const dadosParaAPI = mapearDoacaoFrontendParaBackend(dadosDoacao);

      const doacaoAtualizada = await apiService.updateDoacao(id, dadosParaAPI, arquivo);
      const doacaoMapeada = mapearDoacaoBackendParaFrontend(doacaoAtualizada);
      
      // Atualizar lista local
      setDoacoes(prev => prev.map(d => d.id === id ? doacaoMapeada : d));
      setForceUpdate(prev => prev + 1);
      
      return doacaoMapeada;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const encerrarDoacao = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.updateStatusDoacao(id, 'FINALIZADA');
      
      // Remover da lista local
      setDoacoes(prev => prev.filter(d => d.id !== id));
      setForceUpdate(prev => prev + 1);
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeDoacao = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.deleteDoacao(id);
      
      // Remover da lista local
      setDoacoes(prev => prev.filter(d => d.id !== id));
      setForceUpdate(prev => prev + 1);
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // REALOCAÇÕES (similar às doações)
  const getRealocacoes = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getRealocacoes(filters);
      // Mapear realocações (similar às doações, mas com id_realocacao)
      const realocacoesMapeadas = data.map(realocacao => ({
        id: realocacao.id_realocacao,
        titulo: realocacao.titulo,
        categoria: realocacao.tipo_item,
        descricao: realocacao.descricao,
        imageUrl: realocacao.url_imagem,
        urgencia: realocacao.urgencia,
        quantidade: realocacao.quantidade,
        email: realocacao.email,
        whatsapp: realocacao.whatsapp,
        prazo: realocacao.prazo_necessidade,
        status: realocacao.status,
        publicado: new Date(realocacao.criado_em).toLocaleDateString('pt-BR'),
        tempoRestante: calcularTempoRestante(realocacao.prazo_necessidade),
        ong: realocacao.ong
      }));
      setRealocacoes(realocacoesMapeadas);
      return realocacoesMapeadas;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Funções de paginação
  const getDoacoesPaginadas = async (options = {}) => {
    const { page = 1, limit = 6, filters = {} } = options;
    
    try {
      const allDoacoes = await getMinhasDoacoes('ativas');
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const items = allDoacoes.slice(startIndex, endIndex);
      const totalPages = Math.ceil(allDoacoes.length / limit);
      
      return {
        items,
        currentPage: page,
        totalPages,
        totalItems: allDoacoes.length,
        total: allDoacoes.length,
        itemsPerPage: limit
      };
    } catch (error) {
      return {
        items: [],
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        total: 0,
        itemsPerPage: limit
      };
    }
  };

  const value = {
    // Estado
    doacoes,
    realocacoes,
    loading,
    error,
    isAuthenticated,
    forceUpdate,
    
    // Autenticação
    login,
    logout,
    
    // Doações
    getDoacoes,
    getDoacoesPrestesAVencer,
    getMinhasDoacoes,
    addDoacao,
    updateDoacao,
    encerrarDoacao,
    removeDoacao,
    getDoacoesPaginadas,
    
    // Realocações
    getRealocacoes,
    
    // Utilidades
    calcularTempoRestante,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};
