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
    "data:image/jpeg;base64,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",
    "https://cdn.folhape.com.br/upload/dn_arquivo/2020/04/gade.jpg",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
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
