import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function CardHome({
  imageUrl,
  categoria,
  urgencia,
  ong,
  titulo,
  descricao,
}) {
  return (
    <Card className="max-w-sm w-full bg-white rounded-2xl border border-blue-200 shadow-lg overflow-hidden transition hover:shadow-xl p-0">
      <div className="relative">
        <img
          src={imageUrl}
          alt={titulo}
          className="w-full h-44 object-cover rounded-t-2xl m-0"
        />
        {/* Badges sobre a imagem */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-red-400/90 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm drop-shadow">
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
      <CardContent className="py-6 px-6">
        <CardTitle className="text-3xl font-bold mb-2 leading-tight">{titulo}</CardTitle>
        <a href="#" className="text-blue-600 text-base font-medium hover:underline mb-3 block">{ong}</a>
        <CardDescription className="text-gray-600 text-base mt-2 leading-relaxed">
          {descricao}
        </CardDescription>
      </CardContent>
    </Card>
  );
}