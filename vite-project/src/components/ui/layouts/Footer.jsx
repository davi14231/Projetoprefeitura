export function Footer() {
  return (
    <footer className="bg-[#172233] w-full text-white py-12 px-4 border-t-2 border-blue-400">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-12">
        {/* Logo e slogan */}
        <div className="min-w-[220px] flex flex-col gap-2">
          <img
            src="/imagens/logo-recife.png"
            alt="Recife Prefeitura"
            className="w-36 mb-2"
          />
          <span className="font-bold text-lg">Bora Impactar</span>
          <span className="text-sm text-white/80 leading-tight">A união que transforma vidas</span>
        </div>
        {/* Portal */}
        <div className="min-w-[220px] flex flex-col gap-2">
          <span className="font-bold text-lg mb-1">Portal</span>
          <a href="#" className="text-white/90 text-sm hover:underline">Início</a>
          <a href="#" className="text-white/90 text-sm hover:underline">ONG</a>
          <a href="#" className="text-white/90 text-sm hover:underline">Conecta Recife</a>
          <a href="#" className="text-white/90 text-sm hover:underline">Sobre as ONGs</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;