import api from './api';

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
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doações');
    }
  },

  // 🔍 Listar minhas doações ativas (ONG logada)
  async listarMinhasDoacoes(filtros = {}) {
    try {
      const response = await api.get('/doacoes/minhas/ativas');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar suas doações');
    }
  },

  // 🔍 Listar minhas doações finalizadas (ONG logada)
  async listarMinhasDoacoesFinalizadas() {
    try {
      const response = await api.get('/doacoes/minhas/finalizadas');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doações finalizadas');
    }
  },

  // 🔍 Ver doação específica
  async obterDoacao(id) {
    try {
      const response = await api.get(`/doacoes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar doação');
    }
  },

  // ➕ Criar doação
  async criarDoacao(dadosDoacao) {
    try {
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
        url_imagem: dadosDoacao.imageUrl // usar URL da imagem
      };
      
      const response = await api.post('/doacoes', dadosFormatados);
      return response.data;
    } catch (error) {
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
        urgencia: dadosDoacao.urgencia,
        quantidade: parseInt(dadosDoacao.quantidade),
        email: dadosDoacao.email,
        whatsapp: dadosDoacao.whatsapp,
        prazo_necessidade: dadosDoacao.prazo,
        url_imagem: dadosDoacao.imageUrl
      };
      
      const response = await api.put(`/doacoes/${id}`, dadosFormatados);
      return response.data;
    } catch (error) {
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
