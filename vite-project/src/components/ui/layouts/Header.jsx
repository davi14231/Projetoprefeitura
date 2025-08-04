import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SearchDropdown } from "../SearchDropdown";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

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
            <div className="relative w-full max-w-md" ref={searchRef}>
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
          <nav className="flex items-center gap-4 min-w-fit justify-end">
            <Link to="/home-ong" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Início</Link>
            <Link to="/realocacao-listagem" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Realocação</Link>
            <Link to="/todas-doacoes" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Necessidades</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
