import api from './api';
import { mapRealocacoesFromBackend, mapRealocacaoFromBackend } from '../utils/dataMapper';

export const realocacoesService = {
  // 🔍 Listar realocações públicas
  async listarRealocacoes(filtros = {}) {
    try {
      const params = new URLSearchParams();
      
      // Adicionar filtros como query params
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params.append(key, filtros[key]);
        }
      });
      
      const response = await api.get(`/realocacoes/catalogo?${params.toString()}`);
      return mapRealocacoesFromBackend(response.data); // Mapear dados do backend
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar realocações');
    }
  },

  // 🔍 Listar minhas realocações ativas (ONG logada)
  async listarMinhasRealocacoes() {
    try {
      const response = await api.get('/realocacoes/minhas/ativas');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar suas realocações');
    }
  },

  // 🔍 Listar minhas realocações finalizadas (ONG logada)
  async listarMinhasRealocacoesFinalizadas() {
    try {
      const response = await api.get('/realocacoes/minhas/finalizadas');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar realocações finalizadas');
    }
  },

  // 🔍 Ver realocação específica
  async obterRealocacao(id) {
    try {
      const response = await api.get(`/realocacoes/catalogo/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar realocação');
    }
  },

  // ➕ Criar realocação
  async criarRealocacao(dadosRealocacao) {
    try {
      console.log('➕ Criando realocação:', dadosRealocacao);
      
      // Converter URL relativa para URL completa se necessário
      let urlImagem = dadosRealocacao.imageUrl || dadosRealocacao.url_imagem;
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
        titulo: dadosRealocacao.titulo,
        descricao: dadosRealocacao.descricao,
        tipo_item: dadosRealocacao.categoria, // frontend usa 'categoria', backend 'tipo_item'
        urgencia: dadosRealocacao.urgencia,
        quantidade: parseInt(dadosRealocacao.quantidade),
        email: dadosRealocacao.email,
        whatsapp: dadosRealocacao.whatsapp,
        prazo_necessidade: dadosRealocacao.prazo, // formato: yyyy-mm-dd
        url_imagem: urlImagem // URL válida garantida // URL válida ou placeholder
      };
      
      console.log('📦 Dados formatados para backend:', dadosFormatados);
      
      const response = await api.post('/realocacoes', dadosFormatados);
      console.log('✅ Realocação criada:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar realocação:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar realocação');
    }
  },

  // ✏️ Editar realocação
  async editarRealocacao(id, dadosRealocacao) {
    try {
      // Converter formato do frontend para backend
      const dadosFormatados = {
        titulo: dadosRealocacao.titulo,
        descricao: dadosRealocacao.descricao,
        tipo_item: dadosRealocacao.categoria,
        urgencia: dadosRealocacao.urgencia?.toUpperCase() || 'MEDIA',
        quantidade: parseInt(dadosRealocacao.quantidade),
        email: dadosRealocacao.email,
        whatsapp: dadosRealocacao.whatsapp,
        prazo_necessidade: dadosRealocacao.prazo,
        url_imagem: dadosRealocacao.imageUrl
      };
      
      console.log('🔄 Editando realocação:', id, dadosFormatados);
      const response = await api.put(`/realocacoes/${id}`, dadosFormatados);
      console.log('✅ Realocação editada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao editar realocação:', error);
      throw new Error(error.response?.data?.message || 'Erro ao editar realocação');
    }
  },

  // ✅ Alterar status
  async alterarStatus(id, status) {
    try {
      const response = await api.patch(`/realocacoes/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar status');
    }
  },

  // ❌ Deletar realocação
  async deletarRealocacao(id) {
    try {
      const response = await api.delete(`/realocacoes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar realocação');
    }
  }
};