// Configuração base da API
const API_BASE_URL = 'http://localhost:3000'; // ✅ URL correta do seu backend

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método para fazer requisições HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token se existir
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Se for 204 (No Content), não tentar fazer parse do JSON
      if (response.status === 204) {
        return { success: true };
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.erro || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Método para upload de arquivos
  async uploadRequest(endpoint, formData, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'POST',
      body: formData,
      headers: {},
      ...options,
    };

    // Adicionar token se existir (não adicionar Content-Type para FormData)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.erro || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  // AUTENTICAÇÃO
  async login(email_ong, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email_ong, password }),
    });
  }

  // DOAÇÕES - PÚBLICAS
  async getDoacoes(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.titulo) queryParams.append('titulo', filters.titulo);
    if (filters.tipo_item) queryParams.append('tipo_item', filters.tipo_item);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/doacoes?${queryString}` : '/doacoes';
    
    return this.request(endpoint);
  }

  async getDoacoesPrestesAVencer() {
    return this.request('/doacoes/prestes-a-vencer');
  }

  async getDoacao(id) {
    return this.request(`/doacoes/${id}`);
  }

  // DOAÇÕES - PRIVADAS (requer autenticação)
  async getMinhasDoacoesAtivas() {
    return this.request('/doacoes/minhas/ativas');
  }

  async getMinhasDoacoesFinalizadas() {
    return this.request('/doacoes/minhas/finalizadas');
  }

  async createDoacao(dadosDoacao, arquivo = null) {
    if (arquivo) {
      // Upload com arquivo
      const formData = new FormData();
      Object.keys(dadosDoacao).forEach(key => {
        if (key !== 'foto') {
          formData.append(key, dadosDoacao[key]);
        }
      });
      formData.append('foto', arquivo);
      
      return this.uploadRequest('/doacoes', formData);
    } else {
      // Sem arquivo, usando URL da imagem
      return this.request('/doacoes', {
        method: 'POST',
        body: JSON.stringify(dadosDoacao),
      });
    }
  }

  async updateDoacao(id, dadosDoacao, arquivo = null) {
    if (arquivo) {
      // Upload com arquivo
      const formData = new FormData();
      Object.keys(dadosDoacao).forEach(key => {
        if (key !== 'foto') {
          formData.append(key, dadosDoacao[key]);
        }
      });
      formData.append('foto', arquivo);
      
      return this.uploadRequest(`/doacoes/${id}`, formData, { method: 'PUT' });
    } else {
      return this.request(`/doacoes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dadosDoacao),
      });
    }
  }

  async updateStatusDoacao(id, status) {
    return this.request(`/doacoes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteDoacao(id) {
    return this.request(`/doacoes/${id}`, {
      method: 'DELETE',
    });
  }

  // REALOCAÇÕES - PÚBLICAS
  async getRealocacoes(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.titulo) queryParams.append('titulo', filters.titulo);
    if (filters.tipo_item) queryParams.append('tipo_item', filters.tipo_item);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/realocacoes/catalogo?${queryString}` : '/realocacoes/catalogo';
    
    return this.request(endpoint);
  }

  async getRealocacao(id) {
    return this.request(`/realocacoes/catalogo/${id}`);
  }

  // REALOCAÇÕES - PRIVADAS (requer autenticação)
  async getMinhasRealocacoesAtivas() {
    return this.request('/realocacoes/minhas/ativas');
  }

  async getMinhasRealocacoesFinalizadas() {
    return this.request('/realocacoes/minhas/finalizadas');
  }

  async createRealocacao(dadosRealocacao, arquivo = null) {
    if (arquivo) {
      const formData = new FormData();
      Object.keys(dadosRealocacao).forEach(key => {
        if (key !== 'foto') {
          formData.append(key, dadosRealocacao[key]);
        }
      });
      formData.append('foto', arquivo);
      
      return this.uploadRequest('/realocacoes', formData);
    } else {
      return this.request('/realocacoes', {
        method: 'POST',
        body: JSON.stringify(dadosRealocacao),
      });
    }
  }

  async updateRealocacao(id, dadosRealocacao, arquivo = null) {
    if (arquivo) {
      const formData = new FormData();
      Object.keys(dadosRealocacao).forEach(key => {
        if (key !== 'foto') {
          formData.append(key, dadosRealocacao[key]);
        }
      });
      formData.append('foto', arquivo);
      
      return this.uploadRequest(`/realocacoes/${id}`, formData, { method: 'PUT' });
    } else {
      return this.request(`/realocacoes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dadosRealocacao),
      });
    }
  }

  async updateStatusRealocacao(id, status) {
    return this.request(`/realocacoes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteRealocacao(id) {
    return this.request(`/realocacoes/${id}`, {
      method: 'DELETE',
    });
  }
}

// Instância única da API
export const apiService = new ApiService();
export default apiService;