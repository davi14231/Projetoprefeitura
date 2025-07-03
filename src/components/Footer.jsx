import LogoRecife from '../assets/LogoRecifePrefeitura.svg';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#172233', // cor atualizada
        color: '#fff',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1366px',
          padding: '64px 64px',
          display: 'flex',
          gap: '48px',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {/* Logo e texto */}
        <div style={{ width: '224px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img
            src={LogoRecife}
            alt="Logo da Prefeitura do Recife"
            style={{ width: '150px', objectFit: 'contain' }}
          />
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Bora Impactar</h3>
          <p style={{ fontSize: '20px' }}>A união que transforma vidas</p>
        </div>

        {/* Links */}
        <div style={{ width: '224px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Links Rápidos</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textDecoration: 'underline'
          }}>
            <li><a href="/" style={{ color: '#fff' }}>Página Inicial</a></li>
            <li><a href="/voluntario" style={{ color: '#fff' }}>Sou Voluntário</a></li>
            <li><a href="/ong" style={{ color: '#fff' }}>Sou ONG</a></li>
            <li><a href="https://conectarecife.recife.pe.gov.br" style={{ color: '#fff' }} target="_blank" rel="noreferrer">Conecta Recife</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
