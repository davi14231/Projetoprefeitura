import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function CardHome({
  imageUrl,
  categoria,
  urgencia,
  ong,
  titulo,
  descricao,
  onClick, // Recebe a função de clique como uma propriedade
}) {
  // Define a cor do badge de urgência conforme o valor
  let urgenciaColor = "bg-red-400/90 text-white";
  if (urgencia === "Média") urgenciaColor = "bg-yellow-400/90 text-yellow-900";
  if (urgencia === "Baixa") urgenciaColor = "bg-green-400/90 text-white";

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
      <CardContent className="py-5 px-5 flex-1 flex flex-col">
        <CardTitle className="text-lg font-bold mb-2 leading-tight line-clamp-2 min-h-[3.5rem]">
          {titulo}
        </CardTitle>
        <span
          className="text-[#007AFF] text-xs font-semibold mb-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {ong}
        </span>
        <CardDescription className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
          {descricao}
        </CardDescription>
      </CardContent>
    </Card>
  );
}