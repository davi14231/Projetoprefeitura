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
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center relative">
            {/* Ícone acima do card */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
            </div>
            <div className="pt-4">
              <span className="font-semibold text-gray-800 mb-1">Cadastre sua ONG</span>
              <span className="text-gray-500 text-sm text-center">
                Faça o cadastro e seja validado pela equipe da plataforma
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center relative">
            {/* Ícone acima do card */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <div className="pt-4">
              <span className="font-semibold text-gray-800 mb-1">Adicione necessidades</span>
              <span className="text-gray-500 text-sm text-center">
                Publique os itens que sua ONG precisa e mantenha atualizado
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center relative">
            {/* Ícone acima do card */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            </div>
            <div className="pt-4">
              <span className="font-semibold text-gray-800 mb-1">Receba doações</span>
              <span className="text-gray-500 text-sm text-center">
                Receba contato direto dos doadores e organize a entrega
              </span>
            </div>
          </div>
        </div>
        
        {/* Botão Solicite Itens */}
        <div className="text-center">
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
            Solicite Itens
          </button>
        </div>
      </div>
    </div>
  );
}
