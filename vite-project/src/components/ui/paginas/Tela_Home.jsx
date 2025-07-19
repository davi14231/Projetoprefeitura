  import React from "react";
  import { useNavigate } from "react-router-dom";
  import { BlocoDoador } from "@/components/ui/BlocoInformativoDoador";
  import { BlocoONG } from "@/components/ui/BlocoInformativoONG";
  import ListagemHome from "@/components/ui/ListagemHome";
  import ListagemHome2 from "@/components/ui/ListagemHome2";
  import Footer from "@/components/ui/layouts/Footer";
  import { HeaderTelainicial } from "../layouts/Headertelainicial";

export default function Tela_Home({ imagensCarrossel, itens }) {
  // As imagens do carrossel agora vêm separadas
  const [imgIndex, setImgIndex] = React.useState(0);
  const navigate = useNavigate();
  const imagens = imagensCarrossel || [];

    React.useEffect(() => {
      if (imagens.length === 0) return;
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
            <div className="mx-auto mb-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-100" style={{ maxWidth: 900 }}>
              <img
                src={imagens[imgIndex]}
                alt="Banner"
                className="w-full h-[400px] object-cover"
                style={{ display: 'block' }}
              />
            </div>
            {/* Indicador do carrossel */}
            <div className="flex justify-center mt-2 cursor-pointer">
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
            <p className="text-center text-gray-500 mb-20 text-base">ONGs que precisam da sua doação agora.</p>

            {/* Carrossel 1: Prestes a Vencer */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-red-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                <span className="font-bold text-lg">Prestes a Vencer</span>
              </div>
              <ListagemHome itens={itens} carrosselId="carousel-prestes" />
            </div>

            {/* Carrossel 2: Todas as Necessidades */}
            <div className="mb-4z">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-purple-500 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20m10-10H2"/></svg></span>
                <span className="font-bold text-lg">Todas as Necessidades</span>
              </div>
              <ListagemHome2 itens={itens} carrosselId="carousel-todas" />
              <div className="flex justify-end mt-6">
                <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">Ver todas <span className="ml-1">→</span></a>
              </div>
            </div>
          </div>
        </section>
        <BlocoONG />

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
      </div>
    );
  }

  /*

App.jsx
import Tela_Home from "@/components/ui/paginas/Tela_Home";

// Dados dos cards - futuramente virão do backend
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
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    categoria: "Roupas",
    urgencia: "Média",
    ong: "Casa de Apoio Esperança",
    titulo: "Roupas de Inverno",
    descricao: "Casacos, blusas e calças para o período de inverno. Todas as idades e tamanhos."
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80",
    categoria: "Educação",
    urgencia: "Baixa",
    ong: "Projeto Educar",
    titulo: "Material Escolar",
    descricao: "Cadernos, lápis, canetas, mochilas e outros materiais escolares para crianças carentes."
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80",
    categoria: "Educação",
    urgencia: "Baixa",
    ong: "Projeto Educar",
    titulo: "Material Escolar",
    descricao: "Cadernos, lápis, canetas, mochilas e outros materiais escolares para crianças carentes."
  }
];

function App() {
  return <Tela_Home itens={itens} />;
}

export default App;
*/