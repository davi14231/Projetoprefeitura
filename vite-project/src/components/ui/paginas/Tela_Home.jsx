import React from "react";
import { BlocoDoador } from "@/components/ui/BlocoInformativoDoador";
import { BlocoONG } from "@/components/ui/BlocoInformativoONG";
import ListagemHome from "@/components/ui/ListagemHome";
import Footer from "@/components/ui/layouts/Footer";
import { HeaderTelainicial } from "../layouts/Headertelainicial";

// Exemplo de itens para os cards
const itens = [
  { 
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    categoria: "Alimentos",
    urgencia: "Urgente",
    ong: "Instituto Criança Feliz",
    titulo: "Cestas Básicas Completas",
    descricao: "Cestas básicas completas com arroz, feijão, macarrão, óleo, açúcar, sal e outros itens essenciais."
  },
  // ...adicione mais itens conforme necessário
];

export default function Tela_Home() {
  const imagens = [
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
  ];
  const [imgIndex, setImgIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % imagens.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imagens.length]);

  return (
    <div>
      <HeaderTelainicial />
      <header className="text-center py-8 bg-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Conecte-se com quem precisa.</h1>
        <p className="text-gray-600 text-base md:text-lg mb-6">Encontre ONGs que precisam de doações. Entre em contato diretamente e faça a diferença na vida dessas pessoas.</p>
        {/* Carrossel de imagens funcional com profundidade */}
        <div className="relative flex flex-col items-center">
          <div className="mx-auto mb-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-100" style={{ maxWidth: 600 }}>
            <img
              src={imagens[imgIndex]}
              alt="Banner"
              className="w-full h-auto object-cover"
              style={{ display: 'block' }}
            />
          </div>
          {/* Indicador do carrossel */}
          <div className="flex justify-center mt-2">
            {imagens.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full mx-1 inline-block focus:outline-none transition-all duration-200 ${imgIndex === i ? "bg-gray-500 scale-110 shadow-md" : "bg-gray-300"}`}
                onClick={() => setImgIndex(i)}
                aria-label={`Selecionar imagem ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </header>
      <BlocoDoador />
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Necessidades</h2>
          <p className="text-center text-gray-500 mb-8 text-base">ONGs que precisam da sua doação agora.</p>

          {/* Carrossel 1: Prestes a Vencer */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
              <span className="font-bold text-lg">Prestes a Vencer</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cards do primeiro carrossel */}
              <ListagemHome itens={itens} />
            </div>
          </div>

          {/* Carrossel 2: Todas as Necessidades */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-purple-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20m10-10H2"/></svg></span>
              <span className="font-bold text-lg">Todas as Necessidades</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cards do segundo carrossel (pode ser o mesmo ou outro array) */}
              <ListagemHome itens={itens} />
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">Ver todas <span className="ml-1">→</span></a>
            </div>
          </div>
        </div>
      </section>
      <BlocoONG />
      <Footer />
    </div>
  );
}