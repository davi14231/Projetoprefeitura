import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function Footer() {
  const { isAuthenticated } = useAuth();

  // Determinar a rota de início baseada no estado de autenticação
  const homeRoute = isAuthenticated ? '/home-ong' : '/';

  return (
  <footer className="w-full text-white py-12 px-4 border-t-2" style={{backgroundColor: 'var(--brand-color, #00A5F4)', borderColor: 'rgba(255,255,255,0.25)'}}>
      <div className="max-w-6xl mx-auto flex flex-wrap gap-12">
        {/* Logo e slogan */}
        <div className="min-w-[220px] flex flex-col gap-2">
          <img
            src="imagens/logo-recife.png"
            alt="Recife Prefeitura"
            className="w-36 mb-2"
          />
          <span className="font-bold text-lg">Bora Impactar</span>
          <span className="text-sm text-white/80 leading-tight">A união que transforma vidas</span>
        </div>
        {/* Portal */}
        <div className="min-w-[220px] flex flex-col gap-2">
          <span className="font-bold text-lg mb-1">Portal</span>
          <Link to={homeRoute} className="text-white/90 text-sm hover:underline">Início</Link>
          <a href="https://conecta.recife.pe.gov.br" target="_blank" rel="noopener noreferrer" className="text-white/90 text-sm hover:underline">Conecta Recife</a>
          <a href="https://boraimpactar.recife.pe.gov.br/ngos" target="_blank" rel="noopener noreferrer" className="text-white/90 text-sm hover:underline">Sobre as ONGs</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;