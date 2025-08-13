import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TelaFlutuante from "../TelaFlutuante";
import { SearchDropdown } from "../SearchDropdown";

export function Headeredicao() {
  const [telaFlutuanteVisible, setTelaFlutuanteVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchVisible(e.target.value.length >= 2);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length >= 2) {
      setSearchVisible(true);
    }
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
  <header className="text-white shadow-lg" style={{backgroundColor: 'var(--brand-color, #00A5F4)'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <div className="flex items-center" style={{minWidth: '180px'}}>
            <Link to="/home-ong" className="flex items-center cursor-pointer">
              <img
                src="/imagens/logo-recife.png"
                alt="Recife Prefeitura"
                className="h-10 w-auto"
                draggable={false}
              />
            </Link>
          </div>

          {/* Campo de busca */}
          <div className="flex-1 flex justify-center mx-4">
            <div className="relative w-full max-w-lg" ref={searchRef}>
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
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
              />
              {searchVisible && (
                <SearchDropdown 
                  searchTerm={searchTerm} 
                  onClose={handleSearchClose}
                />
              )}
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-4" style={{minWidth: '180px', justifyContent: 'flex-end'}}>
            <Link to="/home-ong" className="text-white hover:text-white/80 transition-colors text-sm border-b-2 border-transparent hover:border-white/60 pb-1">Início</Link>
            <Link to="/realocacao-listagem" className="text-white hover:text-white/80 transition-colors text-sm border-b-2 border-transparent hover:border-white/60 pb-1">Realocação</Link>
            <Link to="/todas-doacoes" className="text-white hover:text-white/80 transition-colors text-sm border-b-2 border-transparent hover:border-white/60 pb-1">Necessidades</Link>
            
            {/* Minha ONG com dropdown */}
            <div 
              className="relative flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm border-b-2 border-transparent hover:border-white/60 pb-1 whitespace-nowrap cursor-pointer">
                <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold bg-blue-500 text-white rounded-full">ONG</span>
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