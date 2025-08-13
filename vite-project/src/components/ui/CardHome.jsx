import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, Package } from "lucide-react";

export function CardHome({
  imageUrl,
  categoria,
  urgencia,
  ong,
  titulo,
  validade,
  descricao,
  quantidade,
  onClick, // Recebe a função de clique como uma propriedade
}) {
  // Define a cor do badge de urgência conforme o valor
  let urgenciaColor = "bg-red-400/90 text-white";
  if (urgencia === "Média" || urgencia === "Media" || urgencia === "MEDIA") urgenciaColor = "bg-yellow-400/90 text-yellow-900";
  if (urgencia === "Baixa" || urgencia === "BAIXA") urgenciaColor = "bg-green-400/90 text-white";

  // Normalizar validade: se for string ISO com 'T', formatar pt-BR
  let validadeExibicao = validade;
  if (typeof validadeExibicao === 'string' && validadeExibicao.includes('T')) {
    const d = new Date(validadeExibicao);
    if (!isNaN(d.getTime())) {
      validadeExibicao = d.toLocaleDateString('pt-BR');
    }
  }

  return (
    <Card 
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="w-[300px] h-[420px] bg-white rounded-2xl border border-blue-200 shadow-lg overflow-hidden transition hover:shadow-xl p-0 flex flex-col cursor-pointer"
    >
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          alt={titulo}
          className="w-full h-48 object-cover rounded-t-2xl m-0"
        />
        {/* Badges sobre a imagem */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className={`${urgenciaColor} text-xs px-3 py-1 rounded-full font-semibold shadow-sm drop-shadow`}>
            {urgencia}
          </span>
          <span className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-gray-200">
            {categoria}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 rounded-full p-2 shadow border border-blue-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-500" />
          </span>
        </div>
      </div>
      <CardContent className="py-2 px-4 flex-1 flex flex-col">
        <CardTitle className="text-lg font-bold mb-1 leading-tight line-clamp-2 min-h-[2rem]">
          {titulo}
        </CardTitle>
        <a 
          href="#" 
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 text-sm font-medium hover:underline mb-1 block truncate"
        >
          {ong}
        </a>
        
        {/* Quantidade de unidades */}
        <div className="flex items-center gap-1 text-gray-600 text-sm font-medium mb-1">
          <Package className="w-4 h-4" />
          <span>{quantidade} unidades</span>
        </div>
        
        <CardDescription className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-1">
          {descricao}
        </CardDescription>
        
        {/* Data de validade na parte inferior */}
        <div className="flex items-center gap-1 text-red-500 text-sm font-medium mt-auto">
          <Clock className="w-4 h-4" />
          <span>Válido até {validadeExibicao || 'Data não informada'}</span>
        </div>
      </CardContent>
    </Card>
  );
}