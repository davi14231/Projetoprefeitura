export function BlocoONG() {
  return (
    <div className="w-full bg-gradient-to-b from-[#4286f4] to-[#2866d1] py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Como a ONG solicita itens?
        </h2>
        <p className="text-white/90 text-center mb-8">
          Solicite itens de forma rápida e transparente
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <span className="font-semibold text-gray-800 mb-1">Cadastre sua ONG</span>
            <span className="text-gray-500 text-sm text-center">
              Faça o cadastro e seja validado pela equipe da plataforma
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <span className="font-semibold text-gray-800 mb-1">Adicione necessidades</span>
            <span className="text-gray-500 text-sm text-center">
              Publique os itens que sua ONG precisa e mantenha atualizado
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center">
            <span className="font-semibold text-gray-800 mb-1">Receba doações</span>
            <span className="text-gray-500 text-sm text-center">
              Receba contato direto dos doadores e organize a entrega
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
