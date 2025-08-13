import api from './api';
import { mapDoacoesFromBackend, mapDoacaoFromBackend } from '../utils/dataMapper';

export const doacoesService = {
  // 🔍 Listar doações públicas
  async listarDoacoes(filtros = {}) {
    try {
      const params = new URLSearchParams();
      
      // Adicionar filtros como query params
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params.append(key, filtros[key]);
        }
      });
      
      const response = await api.get(`/doacoes?${params.toString()}`);
      
      // O backend retorna diretamente o array de doações, mapeamos para o formato esperado
      return mapDoacoesFromBackend(response.data); 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doações');
    }
  },

  // 🔍 Listar doações prestes a vencer (usa endpoint dedicado se existir; fallback tentativo)
  async listarDoacoesPrestesVencer() {
    // Tentamos endpoints prováveis e, se não existirem, deixamos o caller decidir fallback local
    const caminhos = ['/doacoes/prestes-vencer', '/doacoes/prestes-a-vencer'];
    let ultimaErro;
    for (const path of caminhos) {
      try {
        const response = await api.get(path);
        // Se o backend retornar array diretamente
        return mapDoacoesFromBackend(response.data);
      } catch (err) {
        ultimaErro = err;
        // Continua para tentar o próximo caminho
      }
    }
    // Se nenhum endpoint respondeu, propagamos o último erro para que o DataContext faça fallback de cálculo local
    throw new Error(ultimaErro?.response?.data?.message || 'Endpoints de "prestes a vencer" não disponíveis');
  },

  // 🔍 Listar minhas doações ativas (ONG logada)
  async listarMinhasDoacoes(filtros = {}) {
    try {
      const response = await api.get('/doacoes/minhas/ativas');
      return mapDoacoesFromBackend(response.data); // Mapear dados do backend
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar suas doações');
    }
  },

  // 🔍 Listar minhas doações finalizadas (ONG logada)
  async listarMinhasDoacoesFinalizadas() {
    try {
      const response = await api.get('/doacoes/minhas/finalizadas');
      return mapDoacoesFromBackend(response.data); // Mapear dados do backend
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doações finalizadas');
    }
  },

  // 🔍 Ver doação específica
  async obterDoacao(id) {
    try {
      const response = await api.get(`/doacoes/${id}`);
      return mapDoacaoFromBackend(response.data); // Mapear dados do backend
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doação');
    }
  },

  // ➕ Criar doação
  async criarDoacao(dadosDoacao) {
    try {
      console.log('➕ Criando doação:', dadosDoacao);
      
      // Converter URL relativa para URL completa se necessário
      let urlImagem = dadosDoacao.imageUrl || dadosDoacao.url_imagem;
      if (urlImagem && !urlImagem.startsWith('http')) {
        // Se for URL relativa, usar uma URL de placeholder mais simples
        urlImagem = 'https://picsum.photos/400/300';
      }
      
      // Se não há URL, usar placeholder
      if (!urlImagem) {
        urlImagem = 'https://picsum.photos/400/300';
      }
      
      // Converter formato do frontend para backend
      const dadosFormatados = {
        titulo: dadosDoacao.titulo,
        descricao: dadosDoacao.descricao,
        tipo_item: dadosDoacao.categoria, // frontend usa 'categoria', backend 'tipo_item'
        urgencia: dadosDoacao.urgencia,
        quantidade: parseInt(dadosDoacao.quantidade),
        email: dadosDoacao.email,
        whatsapp: dadosDoacao.whatsapp,
        prazo_necessidade: dadosDoacao.prazo, // formato: yyyy-mm-dd
        url_imagem: urlImagem // URL válida garantida
      };
      
      console.log('📦 Dados formatados para backend:', dadosFormatados);
      
      const response = await api.post('/doacoes', dadosFormatados);
      console.log('✅ Doação criada:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar doação:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar doação');
    }
  },

  // ✏️ Editar doação
  async editarDoacao(id, dadosDoacao) {
    try {
      // Converter formato do frontend para backend
      const dadosFormatados = {
        titulo: dadosDoacao.titulo,
        descricao: dadosDoacao.descricao,
        tipo_item: dadosDoacao.categoria,
        urgencia: dadosDoacao.urgencia?.toUpperCase() || 'BAIXA',
        quantidade: parseInt(dadosDoacao.quantidade),
        email: dadosDoacao.email,
        whatsapp: dadosDoacao.whatsapp,
        prazo_necessidade: dadosDoacao.prazo,
        url_imagem: dadosDoacao.imageUrl
      };
      
      console.log('🔄 Editando doação:', id, dadosFormatados);
      const response = await api.put(`/doacoes/${id}`, dadosFormatados);
      console.log('✅ Doação editada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao editar doação:', error);
      throw new Error(error.response?.data?.message || 'Erro ao editar doação');
    }
  },

  // ✅ Alterar status
  async alterarStatus(id, status) {
    try {
      const response = await api.patch(`/doacoes/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar status');
    }
  },

  // ❌ Deletar doação
  async deletarDoacao(id) {
    try {
      const response = await api.delete(`/doacoes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar doação');
    }
  }
};
