import React from "react";
import { useNavigate } from "react-router-dom";
import { BlocoDoador } from "@/components/ui/BlocoInformativoDoador";
import { BlocoONG2 } from "@/components/ui/BlocoInformativoONG2";
import ListagemHome from "@/components/ui/ListagemHome";
import ListagemHome2 from "@/components/ui/ListagemHome2";
import Footer from "@/components/ui/layouts/Footer";
import { Headerinicio } from "@/components/ui/layouts/Headerinicio";
import DetalheDoacao from "./DetalheDoacao";
import { useData } from "@/context/DataContext";

export default function TelahomeONG({ imagensCarrossel }) {
  // Usar dados do contexto em vez de props
  const { doacoes, doacoesPrestesVencer } = useData();
  
  // As imagens do carrossel agora vêm separadas
  const [imgIndex, setImgIndex] = React.useState(0);
  const [showDetalheModal, setShowDetalheModal] = React.useState(false);
  const [dadosDetalhe, setDadosDetalhe] = React.useState(null);
  const navigate = useNavigate();
  const imagens = imagensCarrossel || [];

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showDetalheModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetalheModal]);

  // Abrir modal DetalheDoacao
  const handleOpenDetalheModal = (item) => {
    console.log("Dados do item antes da formatação (TelahomeONG):", item);
    
    const dadosFormatados = {
      instituto: item.ong,
      publicadoEm: item.publicado || "Data não informada",
      titulo: item.titulo,
      categoria: item.categoria,
      diasRestantes: item.validade ? `Válido até ${item.validade}` : "Sem prazo definido",
      imagemUrl: item.imageUrl,
      descricao: item.descricao,
      email: item.email || "contato@" + item.ong.toLowerCase().replace(/\s+/g, '') + ".org.br",
      whatsapp: item.whatsapp || "(81) 9999-9999"
    };
    
    console.log("Dados formatados para o modal (TelahomeONG):", dadosFormatados);
    setDadosDetalhe(dadosFormatados);
    setShowDetalheModal(true);
  };

  // Fechar modal DetalheDoacao
  const handleCloseDetalheModal = () => {
    setShowDetalheModal(false);
    setDadosDetalhe(null);
  };

  React.useEffect(() => {
    if (imagens.length === 0) return;
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % imagens.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imagens.length]);

    // Dados de destaques com as novas categorias
    const destaques = [
      { 
        id: 1, 
        titulo: "Roupas e Calçados", 
        img: "imagens/roupas.jpg", 
        categoria: "Roupas e Calçados" 
      },
      { 
        id: 2, 
        titulo: "Eletrônicos", 
        img: "imagens/Laptops.jpg", 
        categoria: "Eletrônicos" 
      },
      { 
        id: 3, 
        titulo: "Eletrodomésticos e Móveis", 
        img: "imagens/moveis.jpg", 
        categoria: "Eletrodomésticos e Móveis" 
      },
      { 
        id: 4, 
        titulo: "Utensílios Gerais", 
        img: "imagens/ferramentas.jpg", 
        categoria: "Utensílios Gerais" 
      },
      { 
        id: 5, 
        titulo: "Materiais Educativos e Culturais", 
        img: "imagens/alimentos.jpg", 
        categoria: "Materiais Educativos e Culturais" 
      },
      { 
        id: 6, 
        titulo: "Outros", 
        img: "imagens/outros.jpg", 
        categoria: "Outros" 
      }
    ];

    // Função para navegar para TodasDoacoes com filtro de categoria
    const navigateToCategory = (categoria) => {
      navigate(`/todas-doacoes?categoria=${encodeURIComponent(categoria)}`);
    };

  return (
    <div>
      <Headerinicio />
        <header className="text-center py-8 bg-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Conecte-se com quem precisa.</h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">Encontre ONGs que precisam de doações. Entre em contato diretamente e faça a diferença na vida dessas pessoas.</p>
          {/* Carrossel de imagens funcional com profundidade */}
          <div className="relative flex flex-col items-center">
            <div className="mx-auto mb-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-100" style={{ maxWidth: 900 }}>
              <img
                src={imagens[imgIndex]}
                alt="Banner"
                className="w-full h-[400px] object-cover"
                style={{ display: 'block' }}
              />
            </div>
             {/* Indicador do carrossel */}
            <div className="flex justify-center mt-4 gap-2 py-2 cursor-pointer">
              {imagens.map((_, i) => (
                <button
                  key={i}
                  className={`w-4 h-4 rounded-full focus:outline-none transition-all duration-300 cursor-pointer hover:opacity-80 border ${
                    imgIndex === i 
                      ? "bg-blue-600 border-blue-700 scale-110 shadow-md" 
                      : "bg-gray-300 border-gray-400 hover:bg-gray-400"
                  }`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Selecionar imagem ${i + 1}`}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </header>
        <BlocoDoador />
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho da seção alinhado conforme o layout: título + descrição à esquerda e botão à direita */}
            <div className="w-full max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Necessidades</h2>
                <p className="text-gray-500 text-sm">ONGs que precisam da sua doação agora</p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate('/todas-doacoes')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-sm transition-colors"
                >
                  Ver Todas as Necessidades
                </button>
              </div>
            </div>

            {/* Carrossel 1: Prestes a Vencer */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-red-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                <span className="font-bold text-lg">Prestes a Vencer</span>
              </div>
              {doacoesPrestesVencer && doacoesPrestesVencer.length > 0 ? (
                <ListagemHome itens={doacoesPrestesVencer} carrosselId="carousel-prestes" onCardClick={handleOpenDetalheModal} />
              ) : (
                <div className="text-sm text-gray-500 italic px-2">Nenhum item prestes a vencer.</div>
              )}
            </div>

            {/* Carrossel 2: Todas as Necessidades */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-purple-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20m10-10H2"/></svg></span>
                <span className="font-bold text-lg">Todas as Necessidades</span>
              </div>
              <ListagemHome2 itens={doacoes} carrosselId="carousel-todas" onCardClick={handleOpenDetalheModal} />
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => navigate("/todas-doacoes")}
                  className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                >
                  Ver todas <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <BlocoONG2 />

        {/* Seção Você sabia? */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Você sabia?</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              O Brasil possui mais de 820 mil ONGs registradas, atuando em áreas como educação, 
              saúde, meio ambiente e assistência social — muitas delas dependem exclusivamente de 
              doações e editais públicos para manter seus projetos vivos.
            </p>
          </div>
        </section>

        <Footer />

        {/* Modal DetalheDoacao */}
        {showDetalheModal && dadosDetalhe && (
          <DetalheDoacao 
            dados={dadosDetalhe}
            onClose={handleCloseDetalheModal}
          />
        )}
      </div>
    );
}