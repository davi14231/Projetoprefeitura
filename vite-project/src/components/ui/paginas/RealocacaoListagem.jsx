import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Headerrealocacao } from "@/components/ui/layouts/Headerrealocacao";
import { Footer } from "@/components/ui/layouts/Footer";
import DetalheDoacao from "./DetalheDoacao";
import { PostagemRealocacao } from "./PostagemRealocacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";
import { Facebook, Package, Clock } from "lucide-react";

// import "./MyNewScreen.css";

// Badge colors for categories
const badgeColors = {
  "Roupas e Calçados": "bg-blue-500 text-white",
  "Materiais Educativos e Culturais": "bg-blue-500 text-white",
  "Saúde e Higiene": "bg-blue-500 text-white",
  "Utensílios Gerais": "bg-blue-500 text-white",
  "Itens de Inclusão e Mobilidade": "bg-blue-500 text-white",
  "Eletrodomésticos e Móveis": "bg-blue-500 text-white",
  "Itens Pet": "bg-blue-500 text-white",
  "Eletrônicos": "bg-blue-500 text-white",
  "Outros": "bg-blue-500 text-white",
  default: "bg-blue-500 text-white",
};

export function RealocacaoListagem() {
  const location = useLocation();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [showDetalheModal, setShowDetalheModal] = useState(false);
  const [dadosDetalhe, setDadosDetalhe] = useState(null);
  const [showPostagemModal, setShowPostagemModal] = useState(false);
  const { getRealocacoesPaginadas, loadRealocacoes, realocacoes, forceUpdate } = useData();

  const itemsPerPage = 6;

  // Efeito para ler parâmetros da URL e definir página atual
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // Carregar dados se ainda não vieram (evita ter que recarregar manualmente)
  useEffect(() => {
    if (!realocacoes || realocacoes.length === 0) {
      loadRealocacoes().catch(() => {});
    }
  }, []);

  // Recarregar quando força atualização disparar
  useEffect(() => {
    // Apenas refazer paginação; dados já atualizados no contexto
  }, [forceUpdate]);

  // Obter dados paginados usando Context
  const paginatedData = getRealocacoesPaginadas({
    page: currentPage,
    limit: itemsPerPage,
    filters: { categoria, termo: busca }
  });

  // Lista completa de categorias disponíveis
  const todasCategorias = [
    "Roupas e Calçados",
    "Materiais Educativos e Culturais", 
    "Saúde e Higiene",
    "Utensílios Gerais",
    "Itens de Inclusão e Mobilidade",
    "Eletrodomésticos e Móveis",
    "Itens Pet",
    "Eletrônicos",
    "Outros"
  ];

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showDetalheModal || showPostagemModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetalheModal, showPostagemModal]);

  // Efeito para ler parâmetros da URL e aplicar filtros
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoriaUrl = urlParams.get('categoria');
    
    if (categoriaUrl) {
      console.log('Categoria da URL:', categoriaUrl);
      setCategoria(categoriaUrl);
    }
  }, [location.search]);

  // Abrir modal DetalheDoacao
  const handleOpenDetalheModal = (item) => {
    console.log("Dados do item antes da formatação (RealocacaoListagem):", item);
    
    const dadosFormatados = {
      instituto: item.ong,
      publicadoEm: item.publicado || "Data não informada",
      titulo: item.titulo,
      categoria: item.categoria,
      quantidade: item.quantidade || 1,
  // Removido campo de diasRestantes para realocações (não exibimos 'Válido até')
  // diasRestantes: item.validade ? `Válido até ${item.validade}` : "Sem prazo definido",
      imagemUrl: item.imageUrl,
      descricao: item.descricao,
      email: item.email || "contato@" + item.ong.toLowerCase().replace(/\s+/g, '') + ".org.br",
      whatsapp: item.whatsapp || "(81) 9999-9999"
    };
    
    console.log("Dados formatados para o modal (RealocacaoListagem):", dadosFormatados);
    setDadosDetalhe(dadosFormatados);
    setShowDetalheModal(true);
  };

  // Fechar modal DetalheDoacao
  const handleCloseDetalheModal = () => {
    setShowDetalheModal(false);
    setDadosDetalhe(null);
  };

  // Abrir modal PostagemRealocacao
  const handleOpenPostagemModal = () => {
    setShowPostagemModal(true);
  };

  // Fechar modal PostagemRealocacao
  const handleClosePostagemModal = () => {
    setShowPostagemModal(false);
  };

  // Use a lista completa de categorias ao invés das categorias dos itens
  const categoriasUnicas = todasCategorias;

  return (
    <div className="bg-[#b9d2f7] min-h-screen flex flex-col font-sans">
      <Headerrealocacao />
      <main className="flex-1">
        {/* Título e subtítulo */}
        <section className="max-w-[900px] mx-auto text-center mt-10 mb-6 px-2">
          <h1
            className="text-[1.45rem] md:text-[1.7rem] font-extrabold mb-2 leading-tight text-[#22304d]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Realocação de Itens entre ONGs
          </h1>
          <p
            className="text-[#22304d] text-[0.97rem] md:text-[1.08rem] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Conectamos ONGs do Recife que possuem itens disponíveis com organizações que precisam deles. 
            <br />
            Juntos, maximizamos o impacto social e evitamos o desperdício.
          </p>
        </section>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4 mb-8 max-w-[900px] mx-auto border">
          <span className="flex items-center gap-2 text-gray-700 font-semibold text-[1rem]">
            <img
              src="/imagens/Vector.jpg"
              alt="Filtro"
              className="w-5 h-5"
              draggable={false}
            />
            Filtros
          </span>
          <div style={{ display: "flex", gap: 16, width: "100%" }}>
            {/* Campo de busca */}
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Buscar itens..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-4 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                style={{
                  fontFamily: "Inter, sans-serif",
                  height: "40px",
                  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                }}
              />
            </div>
            {/* Campo de categorias */}
            <div style={{ flex: 1 }}>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white text-gray-700 w-full text-[0.97rem]"
                style={{ fontFamily: "Inter, sans-serif", height: "40px" }}
              >
                <option value="">Categorias</option>
                {categoriasUnicas.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contador de itens */}
        <div
          className="max-w-[900px] mx-auto mb-4 px-2 text-[#22304d] text-xs text-left"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {paginatedData.total} itens encontrados - Página {currentPage} de {paginatedData.totalPages}
        </div>

        {/* Grid de cards */}
        <section className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-2">
          {paginatedData.items.map((item) => (
            <div
              key={item.id}
            >
              <div 
                className="relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden h-full cursor-pointer"
                onClick={() => handleOpenDetalheModal(item)}
              >
                {/* Imagem */}
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.titulo}
                    className="w-full h-40 object-cover object-center bg-white rounded-t-2xl"
                    style={{
                      imageRendering: "auto",
                      borderBottom: "1px solid #f3f4f6",
                      backgroundColor: "#fff",
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Badge categoria */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      badgeColors[item.categoria] || badgeColors.default
                    }`}
                  >
                    {item.categoria}
                  </span>
                </div>
                {/* Conteúdo */}
                <div className="flex flex-col flex-1 px-5 py-4">
                  <a
                    href="#"
                    className="text-[#007AFF] text-xs font-semibold mb-1 hover:underline"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.ong}
                  </a>
                  <div
                    className="text-[1.15rem] font-bold mb-1 leading-tight text-[#222]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.titulo}
                  </div>
                  
                  {/* Quantidade de unidades */}
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-medium mb-1">
                    <Package className="w-4 h-4" />
                    <span>{item.quantidade} unidades</span>
                  </div>
                  
                  <div
                    className="text-[#666] text-xs mb-2 line-clamp-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.descricao}
                  </div>
                  
                  {/* Redes sociais */}
                  {item.facebook && (
                    <div className="flex items-center gap-2 mb-2">
                      <a 
                        href={item.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Facebook className="w-3 h-3" />
                        Facebook
                      </a>
                    </div>
                  )}

                  <div className="mt-auto flex flex-col gap-1 text-[11px] text-[#888]">
                    {/* Validade removida para realocações */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* Paginação */}
        {/* Mantém apenas o componente Pagination para evitar duplicidade e garantir lógica dinâmica */}
        <div className="mb-8">
          <Pagination 
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            baseUrl="/realocacao-listagem"
          />
        </div>

        {/* Bloco CTA */}
        <section className="max-w-[900px] mx-auto mb-20 px-2">
          <div style={{
            background: "#eaf7f0",
            borderRadius: 14,
            padding: "32px 24px",
            textAlign: "center"
          }}>
            <div style={{ color: "#22304d", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Sua ONG tem itens para compartilhar com outras ONGs?
            </div>
            <div style={{ color: "#22304d", marginBottom: 18 }}>
              Cadastre os itens disponíveis em sua organização e ajude outras ONGs a maximizar seu impacto social.
            </div>
            <button
              style={{
                background: "#4bb174",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 32px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer"
              }}
              onClick={handleOpenPostagemModal}
            >
              Cadastrar Itens
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal DetalheDoacao */}
      {showDetalheModal && dadosDetalhe && (
        <DetalheDoacao 
          dados={dadosDetalhe}
          onClose={handleCloseDetalheModal}
          hidePrazo
        />
      )}

      {/* Modal PostagemRealocacao */}
      {showPostagemModal && (
        <PostagemRealocacao 
          onClose={handleClosePostagemModal}
        />
      )}
    </div>
  );
}

export default RealocacaoListagem;