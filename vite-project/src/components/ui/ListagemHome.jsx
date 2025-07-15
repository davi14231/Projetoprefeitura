import { CardHome } from "@/components/ui/CardHome";

function ListagemHome({ itens }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itens.map(item => (
          <CardHome
            key={item.id}
            imageUrl={item.imageUrl}
            categoria={item.categoria}
            urgencia={item.urgencia}
            ong={item.ong}
            titulo={item.titulo}
            descricao={item.descricao}
          />
        ))}
      </div>
    </div>
  );
}

export default ListagemHome;