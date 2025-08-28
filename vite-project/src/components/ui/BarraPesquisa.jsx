import React, { useState, useRef, useEffect } from 'react';
import { Input } from './input';
import { SearchDropdown } from './SearchDropdown';

export function BarraPesquisa({ placeholder = "Pesquisar...", className = "" }) {
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
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <img
            src="imagens/lupa.png"
            alt="Buscar"
            className="w-5 h-5 opacity-60"
            draggable={false}
          />
        </span>
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
      </div>
      {searchVisible && (
        <SearchDropdown 
          searchTerm={searchTerm} 
          onClose={handleSearchClose}
        />
      )}
    </div>
  );
}

export default BarraPesquisa;
