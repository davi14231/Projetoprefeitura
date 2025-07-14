import ListagemHome from "@/components/ui/ListagemHome";

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
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    categoria: "Roupas",
    urgencia: "Alta Urgência",
    ong: "Casa do Bem",
    titulo: "Agasalhos de Inverno",
    descricao: "Agasalhos para moradores de rua durante o inverno."
  }
  // Adicione mais itens conforme necessário
];

function App() {
  return <ListagemHome itens={itens} />;
}

export default App;