import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';

export function SearchDropdown({ searchTerm, onClose }) {
  const navigate = useNavigate();
  const { getDoacoes, getRealocacoes } = useData();
  const [results, setResults] = useState({ items: [], pages: [] });

  // Definir páginas disponíveis para busca
  const pages = [
    { title: 'Início', path: '/home-ong', description: 'Página inicial da ONG' },
    { title: 'Necessidades', path: '/todas-doacoes', description: 'Ver todas as necessidades das ONGs' },
    { title: 'Realocações', path: '/realocacao-listagem', description: 'Ver todos os itens para realocação' },
    { title: 'Minhas Solicitações', path: '/edit-doacoes', description: 'Gerenciar suas solicitações de doação' },
    { title: 'Minhas Realocações', path: '/home-realocacao', description: 'Gerenciar suas postagens de realocação' },
  ];

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2) {
      setResults({ items: [], pages: [] });
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    // Buscar em itens (doações e realocações)
    const doacoes = getDoacoes() || [];
    const realocacoes = getRealocacoes() || [];
    
    const filteredDoacoes = doacoes
      .filter(item => !item.encerrado)
      .filter(item => 
        item.titulo?.toLowerCase().includes(searchLower) ||
        item.categoria?.toLowerCase().includes(searchLower) ||
        item.descricao?.toLowerCase().includes(searchLower) ||
        item.ong?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5) // Limitar a 5 resultados
      .map(item => ({ ...item, type: 'doacao' }));

    const filteredRealocacoes = realocacoes
      .filter(item => !item.encerrado)
      .filter(item => 
        item.titulo?.toLowerCase().includes(searchLower) ||
        item.categoria?.toLowerCase().includes(searchLower) ||
        item.descricao?.toLowerCase().includes(searchLower) ||
        item.ong?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5) // Limitar a 5 resultados
      .map(item => ({ ...item, type: 'realocacao' }));

    // Buscar em páginas
    const filteredPages = pages
      .filter(page => 
        page.title.toLowerCase().includes(searchLower) ||
        page.description.toLowerCase().includes(searchLower)
      )
      .slice(0, 3); // Limitar a 3 resultados

    setResults({
      items: [...filteredDoacoes, ...filteredRealocacoes].slice(0, 6), // Total de 6 itens
      pages: filteredPages
    });
  }, [searchTerm, getDoacoes, getRealocacoes]);

  const handleItemClick = (item) => {
    if (item.type === 'doacao') {
      navigate('/todas-doacoes');
    } else if (item.type === 'realocacao') {
      navigate('/realocacao-listagem');
    }
    onClose();
  };

  const handlePageClick = (page) => {
    navigate(page.path);
    onClose();
  };

  if (!searchTerm || searchTerm.length < 2) {
    return null;
  }

  const hasResults = results.items.length > 0 || results.pages.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {hasResults ? (
        <div className="py-2">
          {/* Seção de Páginas */}
          {results.pages.length > 0 && (
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                Páginas
              </div>
              {results.pages.map((page, index) => (
                <div
                  key={index}
                  onClick={() => handlePageClick(page)}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500">{page.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Seção de Itens */}
          {results.items.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                Itens
              </div>
              {results.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.imageUrl}
                      alt={item.titulo}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.titulo}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{item.ong}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.type === 'doacao' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type === 'doacao' ? 'Necessidade' : 'Realocação'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="px-3 py-6 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="text-sm">Nenhum resultado encontrado</div>
          <div className="text-xs text-gray-400">Tente pesquisar por outros termos</div>
        </div>
      )}
    </div>
  );
}
