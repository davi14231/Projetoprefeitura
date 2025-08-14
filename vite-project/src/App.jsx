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
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import ConfirmacaoDeletar from "./components/ui/paginas/ConfirmacaoDeletar";
import TelaFlutuante from "./components/ui/TelaFlutuante";
import BackendConnectionTest from "./components/BackendConnectionTest";
import React, { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Imagens do carrossel (separadas)
  const imagensCarrossel = [
    "https://blog.brlogic.com/pt/wp-content/uploads/sites/6/2023/03/radio-online-para-ongs-990x621.jpg",
    "https://images.squarespace-cdn.com/content/v1/56b10ce8746fb97c2d267b79/1562945026360-WP41EW2905VXP5VKPAEG/relaotior+ods1.png?format=1500w",
    "https://jpimg.com.br/uploads/2023/05/8-ongs-que-atuam-pelos-animais-no-brasil.jpg"
  ];

    const [telaFlutuanteVisible, setTelaFlutuanteVisible] = useState(false);

    const abrirTelaFlutuante = () => {
      setTelaFlutuanteVisible(true);
    };

    const fecharTelaFlutuante = () => {
      setTelaFlutuanteVisible(false);
    };

  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Tela_Home imagensCarrossel={imagensCarrossel} />} />
          <Route path="/login" element={<Teladelogin />} />
          <Route path="/todas-doacoes" element={<TodasDoacoes />} />
          <Route path="/realocacao-listagem" element={<RealocacaoListagem />} />
          
          {/* Rotas protegidas - requerem autenticação */}
          <Route path="/edit-doacoes" element={
            <ProtectedRoute>
              <EditDoacoes />
            </ProtectedRoute>
          } />
          <Route path="/home-realocacao" element={
            <ProtectedRoute>
              <HomeRealocacao />
            </ProtectedRoute>
          } />
          <Route path="/solicitar-doacao" element={
            <ProtectedRoute>
              <SolicitarDoacao />
            </ProtectedRoute>
          } />
          <Route path="/postagem-realocacao" element={
            <ProtectedRoute>
              <PostagemRealocacao />
            </ProtectedRoute>
          } />
          <Route path="/home-ong" element={
            <ProtectedRoute>
              <TelahomeONG imagensCarrossel={imagensCarrossel} />
            </ProtectedRoute>
          } />
          <Route path="/confirmar-encerrar-solicitacao" element={
            <ProtectedRoute>
              <ConfirmacaoEncerrarSolicitacao />
            </ProtectedRoute>
          } />
          <Route path="/confirmar-encerrar-realocacao" element={
            <ProtectedRoute>
              <ConfirmacaoEncerrarRealocacao />
            </ProtectedRoute>
          } />
          <Route path="/confirmar-deletar" element={
            <ProtectedRoute>
              <ConfirmacaoDeletar />
            </ProtectedRoute>
          } />
        </Routes>

        <TelaFlutuante 
          isVisible={telaFlutuanteVisible}
          onClose={fecharTelaFlutuante}
          nomeONG="Instituto Beneficente"
        />
        
        {/* Componente para monitorar conexão com backend - TEMPORARIAMENTE DESABILITADO */}
        {/* <BackendConnectionTest /> */}
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );}

export default App;
