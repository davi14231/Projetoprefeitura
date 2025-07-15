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
        {/* Carrossel de imagens funcional */}
        <div className="relative flex flex-col items-center">
          <img
            src={imagens[imgIndex]}
            alt="Banner"
            className="mx-auto rounded-xl shadow-lg mb-2"
            style={{ maxWidth: 600 }}
          />
          {/* Indicador do carrossel */}
          <div className="flex justify-center mt-2">
            {imagens.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full mx-1 inline-block focus:outline-none ${imgIndex === i ? "bg-gray-500" : "bg-gray-300"}`}
                onClick={() => setImgIndex(i)}
                aria-label={`Selecionar imagem ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </header>
      <BlocoDoador />
      <section className="py-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Necessidades</h2>
        <p className="text-center text-gray-500 mb-8 text-base">ONGs que precisam da sua doação agora.</p>
        <ListagemHome itens={itens} />
      </section>
      <BlocoONG />
      <Footer />
    </div>
  );
}