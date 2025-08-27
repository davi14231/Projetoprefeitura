import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado ao carregar a aplicação
    const checkAuth = () => {
      console.log('🔍 AuthContext - Verificando autenticação...');
      if (authService.isAuthenticated()) {
        const userData = authService.getCurrentUser();
        console.log('⚠️ USUÁRIO JÁ LOGADO DETECTADO:', userData);
        console.log('🍪 Token encontrado:', authService.getToken());
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.log('✅ Nenhum usuário logado automaticamente');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user || response.ong);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
