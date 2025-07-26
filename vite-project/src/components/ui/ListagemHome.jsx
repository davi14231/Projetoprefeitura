import { CardHome } from "@/components/ui/CardHome";
import { useState } from "react";

function ListagemHome({ itens, carrosselId = 'carousel-container', onCardClick }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    const container = document.getElementById(carrosselId);
    container.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById(carrosselId);
    container.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Botão de navegação esquerda */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center cursor-pointer"
        style={{ marginLeft: '-20px' }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Container do carrossel */}
      <div 
        id={carrosselId}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-25 justify-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {itens.map(item => (
          <div key={item.id} className="flex-shrink-0">
            <CardHome
              imageUrl={item.imageUrl}
              categoria={item.categoria}
              urgencia={item.urgencia}
              ong={item.ong}
              titulo={item.titulo}
              descricao={item.descricao}
              onClick={() => onCardClick && onCardClick(item)}
              disableOngClick={true}
            />
          </div>
        ))}
      </div>

      {/* Botão de navegação direita */}
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors border border-gray-200 cursor-pointer"
        style={{ marginRight: '-20px' }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default ListagemHome;