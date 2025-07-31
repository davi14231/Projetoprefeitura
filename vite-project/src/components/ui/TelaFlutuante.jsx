import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TelaFlutuante.css';

const TelaFlutuante = ({ 
  isVisible, 
  onClose, 
  nomeONG = "Nome da ONG"
}) => {
  const navigate = useNavigate();
  
  if (!isVisible) return null;

  const handleLogout = () => {
    // Limpar dados de sessão/localStorage se necessário
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Mostrar mensagem de confirmação
    alert('Você foi deslogado com sucesso!');
    
    // Fechar o dropdown
    if (onClose) onClose();
    
    // Redirecionar para a tela inicial
    navigate('/');
  };

  return (
    <div className="tela-flutuante-dropdown">
      <div className="tela-flutuante-header">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">ONG</span>
          </div>
        </div>
        <span className="nome-ong">{nomeONG}</span>
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