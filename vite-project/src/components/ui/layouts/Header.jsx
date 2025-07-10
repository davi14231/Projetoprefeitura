export function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Linha superior com logo e campo de busca */}
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/logo-recife.png" 
              alt="Recife Prefeitura" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Campo de busca */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar necessidades da rede das ONGs"
                className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                🔍
              </button>
            </div>
          </div>
        </div>
        
        {/* Linha inferior com navegação */}
        <div className="border-t border-gray-700 py-2">
          <nav className="flex justify-end gap-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Início</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Realocação</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Necessidades</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Edição</a>
          </nav>
        </div>
      </div>
    </header>
  );
}