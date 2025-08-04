import axios from 'axios';
import Cookies from 'js-cookie';

// ⚠️ VERSÃO COM PROXY PARA CONTORNAR CORS
// O Vite fará proxy de /api/* para http://localhost:3000/*
const API_BASE_URL = '/api';

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
    if (token) {
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
      console.log('❌ Token inválido ou expirado');
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      // Deixar o componente decidir o redirecionamento
    }
    return Promise.reject(error);
  }
);

export default api;
