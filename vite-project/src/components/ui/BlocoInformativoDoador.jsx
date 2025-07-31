import { Search, Phone, ShieldCheck } from "lucide-react";

export function BlocoDoador() {
  return (
    <div className="w-full bg-gradient-to-b from-[#4286f4] to-[#2866d1] py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Como o Doador Ajuda?
        </h2>
        <p className="text-white/90 text-center mb-8">
          Doar nunca foi tão direto e transparente
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <Search className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-semibold text-gray-800 mb-1">Encontre necessidades</span>
            <span className="text-gray-500 text-sm text-center">
              Use nossos filtros para encontrar causas específicas na sua região
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <Phone className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-semibold text-gray-800 mb-1">Entre em contato</span>
            <span className="text-gray-500 text-sm text-center">
              Conecte-se diretamente com as ONGs através de WhatsApp ou telefone
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-semibold text-gray-800 mb-1">Faça a diferença</span>
            <span className="text-gray-500 text-sm text-center">
              Doe itens específicos que realmente fazem diferença na vida das pessoas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

