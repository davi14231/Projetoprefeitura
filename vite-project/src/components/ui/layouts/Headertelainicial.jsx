import { Link } from "react-router-dom";

export function HeaderTelainicial() {
  return (
  <header className="text-white p-4 shadow-lg" style={{backgroundColor: 'var(--brand-color, #00A5F4)'}}>
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center" style={{minWidth: '180px'}}>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/imagens/logo-recife.png" 
              alt="Recife Prefeitura" 
              className="h-10 w-auto"
            />
          </Link>
        </div>
        {/* Espaço para centralização */}
        <div className="flex-1"></div>
        {/* Botão Entrar como ONG */}
        <div className="flex justify-end" style={{minWidth: '180px'}}>
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: '#294BB6' }}
          >
            Entrar como ONG
          </Link>
        </div>
      </div>
    </header>
  );
}