import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  // location não usado; removido para evitar no-unused-vars

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Se não está autenticado, redirecionar para a home pública
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se está autenticado, renderizar o componente
  return children;
};

export default ProtectedRoute;
