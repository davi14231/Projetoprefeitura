import { Search, MessageCircle, Handshake, Building2, ClipboardList, Gift } from "lucide-react";

export function BlocoInformativo() {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-1 text-white">Como o Doador Ajuda?</h2>
        <p className="text-base text-blue-100">Doar nunca foi tão direto e transparente</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Search className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Encontre necessidades</h3>
          <p className="text-sm text-muted-foreground text-center">Use nossos filtros para encontrar causas específicas na sua região</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <MessageCircle className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Entre em contato</h3>
          <p className="text-sm text-muted-foreground text-center">Conecte-se diretamente com as ONGs através de WhatsApp ou telefone</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Handshake className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Faça a diferença</h3>
          <p className="text-sm text-muted-foreground text-center">Doe itens específicos que realmente fazem diferença na vida das pessoas</p>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-1 text-white">Como a ONG Solicita Itens?</h2>
        <p className="text-base text-blue-100">Receber doações nunca foi tão fácil e eficiente</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Building2 className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Cadastre Sua ONG</h3>
          <p className="text-sm text-muted-foreground text-center">Cadastre sua organização para começar a solicitar os itens que precisam.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <ClipboardList className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Publique Suas Necessidades</h3>
          <p className="text-sm text-muted-foreground text-center">Publique facilmente os itens que sua ONG precisa, com fotos e detalhes importantes.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Gift className="w-8 h-8 mb-2 text-blue-600" />
          <h3 className="font-semibold mb-1">Receba Doações</h3>
          <p className="text-sm text-muted-foreground text-center">Conecte-se com doadores e receba os itens essenciais para seus projetos.</p>
        </div>
      </div>
    </div>
  );
}