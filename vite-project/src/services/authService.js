import api from './api';
import Cookies from 'js-cookie';

export const authService = {
  // Login do usuário
  async login(credentials) {
    try {
      console.log('🔐 Tentando fazer login com:', { email: credentials.email });
      console.log('🌐 URL da API:', api.defaults.baseURL);
      
      // Ajustar para o formato esperado pelo backend
      const loginData = {
        email_ong: credentials.email, // Backend espera 'email_ong'
        password: credentials.password
      };
      
      const response = await api.post('/auth/login', loginData);
      
      console.log('✅ Resposta do login:', response.data);
      
      // A resposta do backend é: { "auth": true, "token": "..." }
      const token = response.data.token;
      const userData = response.data.user || { email: credentials.email }; // Fallback se não vier user
      
      // Salvar token e dados do usuário nos cookies
      if (token) {
        Cookies.set('auth_token', token, { expires: 7 }); // 7 dias
        Cookies.set('user_data', JSON.stringify(userData), { expires: 7 });
        console.log('🍪 Token e dados salvos nos cookies');
        console.log('👤 Dados do usuário:', userData);
      } else {
        console.warn('⚠️ Token não encontrado na resposta');
        console.log('📋 Estrutura da resposta:', Object.keys(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      console.error('📊 Status:', error.response?.status);
      console.error('📄 Data:', error.response?.data);
      console.error('🌐 URL completa:', error.config?.baseURL + error.config?.url);
      
      // Tratar diferentes tipos de erro baseado na documentação
      if (error.response?.status === 401) {
        throw new Error('Email ou senha incorretos');
      } else if (error.response?.status === 400) {
        throw new Error('Email e senha são obrigatórios');
      } else if (error.response?.status === 404) {
        throw new Error('Endpoint de login não encontrado');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Não foi possível conectar ao servidor backend');
      } else {
        throw new Error(error.response?.data?.message || error.message || 'Erro ao fazer login');
      }
    }
  },

  // Logout
  logout() {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    // Remover redirecionamento automático - deixar o componente decidir
    console.log('👋 Usuário deslogado');
  },

  // Verificar se está logado
  isAuthenticated() {
    return !!Cookies.get('auth_token');
  },

  // Obter dados do usuário
  getCurrentUser() {
    const userData = Cookies.get('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  // Obter token
  getToken() {
    return Cookies.get('auth_token');
  }
};
