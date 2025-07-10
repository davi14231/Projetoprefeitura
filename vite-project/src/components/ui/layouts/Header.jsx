import { Input } from "@/components/ui/input";
import { Botao } from "@/components/ui/botao";

export function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-3">
          {/* Logo */}
          <div className="flex items-center min-w-[140px]">
            <img
              src="/imagens/logo-recife.png"
              alt="Recife Prefeitura"
              className="h-10 w-auto"
              draggable={false}
            />
          </div>

          {/* Campo de busca */}
          <div className="flex-1 flex justify-center md:justify-center my-2 md:my-0">
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Pesquisar necessidades ou itens das ONGs"
                className="pl-10 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-4 min-w-fit justify-end">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Início</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Realocação</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Necessidades</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-sm border-b-2 border-blue-400 pb-1">Edição</a>
            <Botao className="ml-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium">
              Entrar como ONG
            </Botao>
          </nav>
        </div>
      </div>
    </header>
  );
}