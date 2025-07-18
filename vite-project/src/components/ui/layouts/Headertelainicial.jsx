import { Link } from "react-router-dom";

export function HeaderTelainicial() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <img 
            src="/imagens/logo-recife.png" 
            alt="Recife Prefeitura" 
            className="h-10 w-auto"
          />
        </div>
        {/* Botão Entrar como ONG */}
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
          Entrar como ONG
        </Link>
      </div>
    </header>
  );
}