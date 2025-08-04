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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9DroiZJ84HktWguNJ58l4jdkrnaDqm-8bA&s",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
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
