import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useData();
  const location = useLocation();
  
  // Se não estiver autenticado, redireciona para o login
  // e guarda a página que o usuário estava tentando acessar
  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      state={{ 
        from: location.pathname,
        message: "Faça login para acessar esta página" 
      }} 
      replace 
    />;
  }
  
  // Se estiver autenticado, renderiza normalmente o componente filho
  return children;
}

export default PrivateRoute;