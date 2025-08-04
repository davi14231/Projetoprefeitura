import axios from 'axios';
import Cookies from 'js-cookie';

// ⚠️ VERSÃO COM PROXY PARA CONTORNAR CORS
// Use esta configuração se o backend não aceitar a porta do frontend
const API_BASE_URL = '/api'; // Usa proxy do Vite

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      console.warn('🔑 Token inválido. Redirecionando para login...');
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      // Redirecionar para login se necessário
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
