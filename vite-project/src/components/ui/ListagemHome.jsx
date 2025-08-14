import { CardHome } from "@/components/ui/CardHome";

function ListagemHome({ itens = [], carrosselId = 'carousel-container', onCardClick }) {
  // scrollPosition removido: não era utilizado para lógica de UI

  // Verificar se itens é um array válido
  if (!Array.isArray(itens)) {
    console.warn('ListagemHome: itens deve ser um array, recebido:', itens);
    return <div>Carregando...</div>;
  }

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
          <div key={item.id_produto || item.id} className="flex-shrink-0">
            <CardHome
              imageUrl={item.url_imagem || item.imageUrl}
              categoria={item.tipo_item || item.categoria}
              urgencia={item.urgencia}
              ong={item.ong?.nome || item.ong}
              titulo={item.titulo}
              validade={item.prazo_necessidade || item.validade}
              descricao={item.descricao}
              quantidade={item.quantidade}
              onClick={() => onCardClick && onCardClick(item)}
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