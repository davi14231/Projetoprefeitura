import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import TelaFlutuante from "../TelaFlutuante";

export function Headernecessidade() {
  const [telaFlutuanteVisible, setTelaFlutuanteVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTelaFlutuanteVisible(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setTelaFlutuanteVisible(false);
    }, 300);
    setTimeoutId(id);
  };

  const handleTelaFlutuanteMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleTelaFlutuanteMouseLeave = () => {
    setTelaFlutuanteVisible(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-3">
          {/* Logo */}
          <Link to="/home-ong" className="flex items-center min-w-[140px] cursor-pointer">
            <img
              src="/imagens/logo-recife.png"
              alt="Recife Prefeitura"
              className="h-10 w-auto"
              draggable={false}
            />
          </Link>

          {/* Campo de busca */}
          <div className="flex-1 flex justify-center md:justify-center my-2 md:my-0">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img
                  src="/imagens/lupa.png"
                  alt="Buscar"
                  className="w-5 h-5 opacity-60"
                  draggable={false}
                />
              </span>
              <Input
                type="text"
                placeholder="Pesquisar necessidades ou itens das ONGs"
                className="pl-10 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-4 min-w-fit justify-end">
            <Link to="/home-ong" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Início</Link>
            <Link to="/realocacao-listagem" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Realocação</Link>
            <Link to="/todas-doacoes" className="text-blue-400 hover:text-blue-300 transition-colors text-sm border-b-2 border-blue-400 pb-1">Necessidades</Link>
            
            {/* Minha ONG com dropdown */}
            <div 
              className="relative flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1 whitespace-nowrap cursor-pointer">
                <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold bg-gray-600 text-white rounded-full">ONG</span>
                <Link to="/edit-doacoes" className="flex items-center gap-1">
                  Minha ONG
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${telaFlutuanteVisible ? 'rotate-180' : 'rotate-0'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              {telaFlutuanteVisible && (
                <div 
                  className="absolute top-full right-0 mt-2 z-50"
                  onMouseEnter={handleTelaFlutuanteMouseEnter}
                  onMouseLeave={handleTelaFlutuanteMouseLeave}
                >
                  <TelaFlutuante 
                    isVisible={true}
                    onClose={() => setTelaFlutuanteVisible(false)}
                    nomeONG="Instituto Beneficente"
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}