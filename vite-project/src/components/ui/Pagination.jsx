import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  baseUrl, 
  className = "" 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Função para navegar para uma página específica
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    
    // Manter parâmetros de query existentes
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', page);
    
    if (baseUrl) {
      navigate(`${baseUrl}?${urlParams.toString()}`);
    }
    
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Gerar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Máximo de páginas visíveis
    
    if (totalPages <= maxVisible) {
      // Se há poucas páginas, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas com "..."
      if (currentPage <= 4) {
        // Início: 1 2 3 4 5 ... últimas
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Final: primeiras ... penúltimas últimas
        pages.push(1);
        pages.push(2);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Meio: primeira ... atual-1 atual atual+1 ... última
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Não mostra paginação se há apenas 1 página
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      {/* Botão Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded text-sm font-medium transition ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border text-gray-700 hover:bg-gray-100 cursor-pointer shadow hover:scale-[1.05]'
        }`}
      >
        ‹ Anterior
      </button>

      {/* Números das páginas */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded text-sm font-semibold transition ${
              page === currentPage
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white border text-gray-700 hover:bg-gray-100 cursor-pointer shadow hover:scale-[1.05]'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Botão Próximo */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded text-sm font-medium transition ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border text-gray-700 hover:bg-gray-100 cursor-pointer shadow hover:scale-[1.05]'
        }`}
      >
        Próximo ›
      </button>
    </div>
  );
}
