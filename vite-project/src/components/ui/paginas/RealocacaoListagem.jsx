
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headerrealocacao } from "@/components/ui/layouts/Headerrealocacao";
import { Footer } from "@/components/ui/layouts/Footer";
import ConfirmacaoEncerrarRealocacao from "./ConfirmacaoEncerrarRealocacao";

// import "./MyNewScreen.css";

const badgeColors = {
	Alimentos: "bg-[#34C759] text-white", // verde
	Roupas: "bg-[#007AFF] text-white", // azul
	Eletrônicos: "bg-[#5856D6] text-white", // roxo
	Móveis: "bg-[#FF9500] text-white", // laranja
	Brinquedos: "bg-[#FFCC00] text-gray-900", // amarelo
	Medicamentos: "bg-[#FF3B30] text-white", // vermelho
	"Material Escolar": "bg-[#8E8E93] text-white", // cinza
	Livros: "bg-[#AF52DE] text-white", // lilás
	Educação: "bg-[#8E8E93] text-white", // cinza
	default: "bg-gray-300 text-gray-800",
};

export function RealocacaoListagem({ itens = [] }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showConfirmacaoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConfirmacaoModal]);

  // Abrir modal ConfirmacaoEncerrarRealocacao
  const handleOpenConfirmacaoModal = () => {
    setShowConfirmacaoModal(true);
  };

  // Fechar modal ConfirmacaoEncerrarRealocacao
  const handleCloseConfirmacaoModal = () => {
    setShowConfirmacaoModal(false);
  };

  // Confirmar encerramento da realocação
  const handleConfirmEncerramento = () => {
    // Aqui você pode adicionar a lógica para encerrar a realocação
    setShowConfirmacaoModal(false);
    // Exemplo: remover o item da lista ou atualizar status
  };


  const categoriasUnicas = [...new Set(itens.map((i) => i.categoria))];

  const itensFiltrados = itens.filter(
    (item) =>
      (!busca || item.titulo.toLowerCase().includes(busca.toLowerCase()) || item.ong.toLowerCase().includes(busca.toLowerCase())) &&
      (!categoria || item.categoria === categoria)
  );

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
          {itensFiltrados.length} itens encontrados
        </div>

        {/* Grid de cards */}
        <section className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-2">
          {itensFiltrados.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-[400px] mx-auto h-[370px] flex"
            >
              <div className="relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden h-full cursor-pointer">
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
                  {/* Badge urgência */}
                  {(item.urgencia === "Urgente" || item.urgencia === true) && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF3B30] text-white shadow">
                      Urgente
                    </span>
                  )}
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
                  <div className="flex items-center gap-2 text-[#444] text-xs mb-2">
                    <img
                      src="/imagens/Emoji Box.png"
                      alt="Quantidade"
                      className="w-4 h-4"
                      style={{ filter: "grayscale(60%)" }}
                      draggable={false}
                    />
                    <span className="font-medium">{item.quantidade || "Não informado"}</span>
                  </div>
                  <div
                    className="text-[#666] text-xs mb-2 line-clamp-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.descricao}
                  </div>
                  <div className="mt-auto flex flex-col gap-1 text-[11px] text-[#888]">
                    <div className="flex items-center gap-1">
                      <img
                        src="/imagens/Emoji relogio.png"
                        alt="Publicado em"
                        className="w-4 h-4"
                        style={{ filter: "grayscale(60%)" }}
                        draggable={false}
                      />
                      <span>Publicado em {item.publicado || "Data não informada"}</span>
                    </div>
                    {item.validade && (
                      <div className="flex items-center gap-1 text-[#FF3B30] font-semibold">
                        <img
                          src="/imagens/Emoji Calendario.png"
                          alt="Validade"
                          className="w-4 h-4"
                          style={{ filter: "grayscale(0%)" }}
                          draggable={false}
                        />
                        <span>Válido até {item.validade}</span>
                      </div>
                    )}
                  </div>
                  {/* Botão Encerrar Realocação */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button
                      className="w-full bg-[#172233] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#22304d] transition cursor-pointer shadow-md text-sm"
                      onClick={handleOpenConfirmacaoModal}
                    >
                      Encerrar Realocação
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* Paginação */}
        <div className="max-w-[1200px] mx-auto flex justify-center mb-12">
          <nav className="flex gap-2">
            <button className="w-8 h-8 rounded bg-blue-600 text-white font-semibold text-[0.97rem]">
              1
            </button>
            <button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
              2
            </button>
            <button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-[0.97rem]">
              ...
            </span>
            <button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
              67
            </button>
            <button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
              68
            </button>
          </nav>
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
              onClick={() => navigate("/postagem-realocacao")}
            >
              Cadastrar Itens
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal ConfirmacaoEncerrarRealocacao */}
      {showConfirmacaoModal && (
        <ConfirmacaoEncerrarRealocacao 
          onCancel={handleCloseConfirmacaoModal}
          onConfirm={handleConfirmEncerramento}
        />
      )}
    </div>
  );
}

export default RealocacaoListagem;