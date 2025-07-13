import React from 'react';
import './BotaoLogin.css'; // Importa o CSS correspondente

/**
 * Componente de botão de login customizável.
 * @param {object} props - As propriedades do componente.
 * @param {function} props.onClick - A função a ser chamada quando o botão é clicado.
 * @param {string} props.children - O texto que será exibido no botão.
 */
const BotaoLogin = ({ onClick, children }) => {
  return (
    <button className="botao-login" onClick={onClick}>
      {children}
    </button>
  );
};

export default BotaoLogin;