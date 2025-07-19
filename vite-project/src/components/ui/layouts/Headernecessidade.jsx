import { Input } from "@/components/ui/input";
import { Botao } from "@/components/ui/botao";
import { Link, useNavigate } from "react-router-dom";

export function Headernecessidade() {
  const navigate = useNavigate();
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img
                  src="/imagens/lupa.png"
                  alt="Buscar"
                  className="w-5 h-5 opacity-60"
                  draggable={false}
                />
              </span>
              <Input
                type="text"
                placeholder="Pesquisar necessidades ou itens das ONGs"
                className="pl-10 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-4 min-w-fit justify-end">
            <Link to="/home-ong" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Início</Link>
            <Link to="/realocacao-listagem" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Realocação</Link>
            <Link to="/todas-doacoes" className="text-blue-400 hover:text-blue-300 transition-colors text-sm border-b-2 border-blue-400 pb-1">Necessidades</Link>
            <Link to="/edit-doacoes" className="text-gray-300 hover:text-white transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Minha ONG</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}