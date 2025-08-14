import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Package } from "lucide-react";

export function CardPedidos({
    imageUrl,
    categoria,
    urgencia,
    ong,
    titulo,
    quantidade,
    descricao,
    publicado,
    validade,
}) {
  let validadeExibicao = validade;
  if (typeof validadeExibicao === 'string' && validadeExibicao.includes('T')) {
    const d = new Date(validadeExibicao);
    if (!isNaN(d.getTime())) {
      validadeExibicao = d.toLocaleDateString('pt-BR');
    }
  }
  return (
    <Card className="max-w-md w-full bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden p-0">
      <div className="relative">
        <img
          src={imageUrl}
          alt={titulo}
          className="w-full h-44 object-contain bg-white rounded-t-xl"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-gray-200">
            {categoria}
          </span>
          {urgencia && (
            <span className={`${(() => { const n=(urgencia||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toUpperCase(); if(n==='BAIXA') return 'bg-green-100 border border-green-200 text-green-700'; if(n==='MEDIA') return 'bg-yellow-100 border border-yellow-200 text-yellow-700'; return 'bg-red-100 border border-red-200 text-red-700'; })()} text-xs px-3 py-1 rounded-full font-semibold shadow-sm`}> 
              {urgencia.charAt(0).toUpperCase()+urgencia.slice(1).toLowerCase()}
            </span>
          )}
        </div>
      </div>
      <CardContent className="py-5 px-6">
        {/* ONG */}
        <span className="text-blue-600 font-medium mb-2 block">{ong}</span>
        {/* Título */}
        <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
        {/* Quantidade */}
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Package className="w-5 h-5" />
          <span className="font-semibold">{quantidade}</span>
        </div>
        {/* Descrição */}
        <p className="text-gray-600 text-base mb-4">{descricao}</p>
        {/* Publicado e validade */}
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays className="w-4 h-4" />
            <span>Publicado em {publicado}</span>
          </div>
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <CalendarDays className="w-4 h-4" />
            <span>Válido até {validadeExibicao || 'Data não informada'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}