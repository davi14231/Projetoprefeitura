import { Teladelogin } from "./components/ui/paginas/Teladelogin";
import Tela_Home from "./components/ui/paginas/Tela_Home";
import { EditDoacoes } from "./components/ui/paginas/EditDoacoes";
import { HomeRealocacao } from "./components/ui/paginas/HomeRealocacao";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SolicitarDoacao } from "./components/ui/paginas/SolicitarDoacao";
import { PostagemRealocacao } from "./components/ui/paginas/PostagemRealocacao";
import TodasDoacoes from "./components/ui/paginas/TodasDoacoes";
import TelahomeONG from "./components/ui/paginas/TelahomeONG";
import { RealocacaoListagem } from "./components/ui/paginas/RealocacaoListagem";
import ConfirmacaoEncerrarSolicitacao from "./components/ui/paginas/ConfirmacaoEncerrarSolicitacao";
import ConfirmacaoEncerrarRealocacao from "./components/ui/paginas/ConfirmacaoEncerrarRealocacao";

function App() {
  // Imagens do carrossel (separadas)
  const imagensCarrossel = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9DroiZJ84HktWguNJ58l4jdkrnaDqm-8bA&s",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
  ];

  // Itens dos cards
  const itens = [
    {
      id: 1,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9DroiZJ84HktWguNJ58l4jdkrnaDqm-8bA&s",
      titulo: "Cestas Básicas Completas",
      ong: "Instituto Criança Feliz",
      categoria: "Alimentos",
      urgencia: "Urgente",
      descricao: "Cestas básicas completas com arroz, feijão, etc."
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      categoria: "Alimentos",
      urgencia: "Urgente",
      ong: "Instituto Criança Feliz",
      titulo: "Cestas Básicas Completas",
      descricao: "Cestas básicas completas com arroz, feijão, macarrão, óleo, açúcar, sal e outros itens essenciais."
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      categoria: "Roupas",
      urgencia: "Média",
      ong: "Casa de Apoio Esperança",
      titulo: "Roupas de Inverno",
      descricao: "Casacos, blusas e calças para o período de inverno. Todas as idades e tamanhos."
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80",
      categoria: "Educação",
      urgencia: "Baixa",
      ong: "Projeto Educar",
      titulo: "Material Escolar",
      descricao: "Cadernos, lápis, canetas, mochilas e outros materiais escolares para crianças carentes."
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80",
      categoria: "Educação",
      urgencia: "Baixa",
      ong: "Projeto Educar",
      titulo: "Material Escolar",
      descricao: "Cadernos, lápis, canetas, mochilas e outros materiais escolares para crianças carentes."
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80",
      categoria: "Educação",
      urgencia: "Baixa",
      ong: "Projeto Educar",
      titulo: "Material Escolar",
      descricao: "Cadernos, lápis, canetas, mochilas e outros materiais escolares para crianças carentes."
    }
    // Adicione mais itens conforme necessário
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tela_Home imagensCarrossel={imagensCarrossel} itens={itens} />} />
        <Route path="/login" element={<Teladelogin />} />
        <Route path="/edit-doacoes" element={<EditDoacoes />} />
        <Route path="/home-realocacao" element={<HomeRealocacao />} />
        <Route path="/solicitar-doacao" element={<SolicitarDoacao />} />
        <Route path="/postagem-realocacao" element={<PostagemRealocacao />} />
        <Route path="/todas-doacoes" element={<TodasDoacoes itens={itens} />} />
        <Route path="/home-ong" element={<TelahomeONG imagensCarrossel={imagensCarrossel} itens={itens} />} />
        <Route path="/realocacao-listagem" element={<RealocacaoListagem itens={itens} />} />
        <Route path="/confirmar-encerrar-solicitacao" element={<ConfirmacaoEncerrarSolicitacao />} />
        <Route path="/confirmar-encerrar-realocacao" element={<ConfirmacaoEncerrarRealocacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;