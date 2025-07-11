import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img
            src="/imagens/logo-recife.png"
            alt="Logo da Prefeitura do Recife"
            className="footer-logo"
          />
          <p className="footer-tagline">A união que transforma vidas</p>
        </div>

        <div className="footer-column">
          <h3>Links Rápidos</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/doacoes">Portal de Doações</a></li>
            <li><a href="/estoque">Plataforma de Estoque</a></li>
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/suporte">Suporte</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Como Podemos Ajudar?</h3>
          <p>
            Para solicitar algo específico ou informações, envie<br />
            um contato:<br />
            <a href="mailto:contato@recifeconecta.org">contato@recifeconecta.org</a>
          </p>
        </div>

        <div className="footer-column">
          <h3>Como a ONG Solicita Itens?</h3>
          <p>
            Acesse o site Org da sua ONG e clique em “Solicitar”
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
