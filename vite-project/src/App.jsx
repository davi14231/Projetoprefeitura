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