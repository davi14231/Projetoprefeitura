import { Header } from "@/components/ui/layouts/Header.jsx";
import Card from "./components/componentes/Card.jsx";; // 1. Importe o componente Card
import './App.css'; // Opcional: para centralizar o conteúdo para teste

function App() {
  // Dados de exemplo para preencher o card
  const itemExemplo = {
    imageUrl: 'https://i.imgur.com/iUmRTct.png', // Use uma imagem de exemplo
    category: 'ROUPAS',
    title: 'Doação de Agasalhos de Inverno',
    location: 'São Paulo, SP'
  };

  return (
    // 2. Use um Fragment <> ou uma <div> para agrupar os componentes
    <>
      <Header />

      {/* 3. Área de teste para os cards */}
      <main className="test-container">
        <h1>Teste do Componente Card</h1>

        {/* --- Card com dados de exemplo --- */}
        <Card
          imageUrl={itemExemplo.imageUrl}
          category={itemExemplo.category}
          title={itemExemplo.title}
          location={itemExemplo.location}
        />

        {/* --- Card padrão, sem preenchimento --- */}
        <Card />

      </main>
    </>
  );
}

export default App;