import axios from 'axios';
import Cookies from 'js-cookie';

// Base da API configurável por ambiente
// Em dev, use o proxy do Vite com '/api'; em Docker/produção pode vir de VITE_API_URL
const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    console.log('🍪 DEBUG - Token encontrado:', token ? `${token.substring(0, 20)}...` : 'NENHUM');
    
    if (token) {
      console.log('🔐 DEBUG - Adicionando token na requisição para:', config.url);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Remover redirecionamento automático que causa loops
    if (error.response?.status === 401) {
      const badToken = Cookies.get('auth_token');
      console.log('❌ Token inválido ou expirado');
      console.log('🗑️ DEBUG - Token corrompido sendo removido:', badToken ? `${badToken.substring(0, 20)}...` : 'NENHUM');
      console.log('📍 DEBUG - URL que falhou:', error.config?.url);
      
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      // Deixar o componente decidir o redirecionamento
    }
    return Promise.reject(error);
  }
);

export default api;
