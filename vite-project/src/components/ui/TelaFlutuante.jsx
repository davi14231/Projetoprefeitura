import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './TelaFlutuante.css';

const TelaFlutuante = ({ 
  isVisible, 
  onClose, 
  nomeONG = "Nome da ONG"
}) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  if (!isVisible) return null;

  const handleLogout = () => {
    // Usar o método logout do AuthContext
    logout();
    
    // Mostrar mensagem de confirmação
    alert('Você foi deslogado com sucesso!');
    
    // Fechar o dropdown
    if (onClose) onClose();

  // Redirecionar para a tela inicial
  navigate('/');
  };

  // Usar o nome da ONG do usuário autenticado, se disponível
  const displayName = user?.nome || user?.name || nomeONG;

  return (
    <div className="tela-flutuante-dropdown">
      <div className="tela-flutuante-header">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">ONG</span>
          </div>
        </div>
        <span className="nome-ong">{displayName}</span>
      </div>
      
      <div className="divider"></div>
      
      <div className="tela-flutuante-content">
        <button className="btn-sair" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default TelaFlutuante;