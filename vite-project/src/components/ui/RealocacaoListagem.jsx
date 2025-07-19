// src/components/MyNewScreen.js

import React, { useState } from "react";
import { Header } from "@/components/ui/layouts/Header";
import { Footer } from "@/components/ui/layouts/Footer";
import "./MyNewScreen.css";

export function RealocacaoListagem({ itens = [] }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  const itensFiltrados = itens.filter(
    (item) =>
      (!busca || item.titulo.toLowerCase().includes(busca.toLowerCase()) || item.ong.toLowerCase().includes(busca.toLowerCase())) &&
      (!categoria || item.categoria === categoria)
  );

  return (
    <div className="my-new-screen" style={{ background: "#b9d2f7", minHeight: "100vh" }}>
      <Header searchAlign="center" />
      <main>
        <div className="rounded-xl bg-[#b9d2f7] py-6 px-2">
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#22304d", textAlign: "center", marginBottom: 24 }}>
            Realocação de Itens entre ONGs
          </h1>
          <p style={{ textAlign: "center", color: "#22304d", marginBottom: 36 }}>
            Conectamos ONGs do Recife que possuem itens disponíveis com organizações que precisam deles. Juntos, maximizamos o impacto social e evitamos o desperdício.
          </p>
          {/* Filtros */}
          <div
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-4 mb-8"
            style={{
              maxWidth: 1200,
              minWidth: 320,
              width: "100%",
              margin: "0 auto 32px auto",
              boxSizing: "border-box",
            }}
          >
            <span style={{ color: "#22304d", fontWeight: 600, fontSize: 18, marginBottom: 8, display: "flex", alignItems: "center" }}>
              <img src="/imagens/Vector.jpg" alt="Filtro" style={{ width: 22, height: 22, marginRight: 8, marginLeft: 2 }} />
              Filtros
            </span>
            <div style={{ display: "flex", gap: 16, width: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  style={{
                    minWidth: 180,
                    width: "100%",
                    paddingLeft: 16,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  style={{ minWidth: 160, width: "100%" }}
                >
                  <option value="">Categorias</option>
                  {[...new Set(itens.map(i => i.categoria))].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Contador */}
          <div style={{ color: "#22304d", fontWeight: 500, marginBottom: 32, maxWidth: 1200, margin: "0 auto" }}>
            {itensFiltrados.length} itens encontrados
          </div>
          {/* Cards */}
          <div className="data-container" style={{ maxWidth: 1200, margin: "0 auto" }}>
            {itensFiltrados.map(item => (
              <div
                key={item.id}
                className="data-item"
                style={{ position: "relative", cursor: "pointer" }}
                tabIndex={0}
              >
                {/* Etiquetas */}
                <div style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 6, zIndex: 2 }}>
                  <span style={{
                    background: "#4bb174",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "2px 10px"
                  }}>{item.categoria}</span>
                  {item.urgencia && (
                    <span style={{
                      background: "#f55",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 8,
                      padding: "2px 10px"
                    }}>Urgente</span>
                  )}
                </div>
                {/* Imagem */}
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 12,
                    marginTop: 8
                  }}
                />
                <div style={{ fontWeight: 600, color: "#4bb174", fontSize: 0.95 + "rem", marginBottom: 2 }}>{item.ong}</div>
                <div style={{ fontWeight: 700, color: "#22304d", fontSize: 1.1 + "rem", marginBottom: 2 }}>{item.titulo}</div>
                <div style={{ color: "#22304d", fontSize: 15, marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
                  <img src="/imagens/quant.jpg" alt="Quantidade" style={{ width: 18, height: 18, marginRight: 2 }} />
                  {item.quantidade}
                </div>
                <div style={{ color: "#444", fontSize: 14, marginBottom: 10, minHeight: 40 }}>{item.descricao}</div>
                <div style={{ color: "#22304d", fontSize: 13, marginBottom: 2, display: "flex", flexDirection: "column", gap: 0 }}>
                  <span style={{ opacity: 0.7, display: "flex", alignItems: "center", gap: 4 }}>
                    <img src="/imagens/Calendario.jpg" alt="Calendário" style={{ width: 15, height: 15, marginRight: 2, objectFit: "contain" }} />
                    Publicado em: {item.publicado}
                  </span>
                  {item.validade && (
                    <span style={{ color: "#f55", fontWeight: 600, marginLeft: 0, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <img src="/imagens/relogio.jpg" alt="Relógio" style={{ width: 15, height: 15, marginRight: 2, objectFit: "contain" }} />
                      Válido até: {item.validade}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Paginação */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, margin: "32px 0" }}>
            <button style={{
              width: 32, height: 32, borderRadius: 8, background: "#22304d", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer"
            }}>1</button>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: "none", color: "#22304d", fontWeight: 700, border: "none", cursor: "pointer" }}>2</button>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: "none", color: "#22304d", fontWeight: 700, border: "none", cursor: "pointer" }}>3</button>
            <span style={{ color: "#22304d", fontWeight: 700 }}>...</span>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: "none", color: "#22304d", fontWeight: 700, border: "none", cursor: "pointer" }}>67</button>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: "none", color: "#22304d", fontWeight: 700, border: "none", cursor: "pointer" }}>68</button>
          </div>
          {/* Bloco CTA */}
          <div style={{
            background: "#eaf7f0",
            borderRadius: 14,
            padding: "32px 24px",
            margin: "40px auto 0 auto",
            maxWidth: 1200,
            textAlign: "center"
          }}>
            <div style={{ color: "#22304d", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Sua ONG tem itens para compartilhar com outras ONGs?
            </div>
            <div style={{ color: "#22304d", marginBottom: 18 }}>
              Cadastre os itens disponíveis em sua organização e ajude outras ONGs a maximizar seu impacto social.
            </div>
            <button
              style={{
                background: "#4bb174",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 32px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer"
              }}
              onClick={() => alert("Cadastro de itens")}
            >
              Cadastrar Itens
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RealocacaoListagem;


/*Arquivo app.jsx

import { useState } from "react";
import { RealocacaoListagem } from "@/components/ui/RealocacaoListagem";

// Exemplo de itens com URLs de imagens (simulando imagens enviadas por usuários)
const itensMock = [
  {
    id: 1,
    categoria: "Alimentos",
    urgencia: true,
    ong: "Instituto Criança Feliz",
    titulo: "Cestas Básicas Completas",
    quantidade: "25 unidades",
    descricao: "Cestas básicas completas com arroz, feijão, macarrão, óleo, açúcar, sal e outros itens essenciais. Ideal para famílias atendidas em situação de vulnerabilidade.",
    publicado: "15/07/2024",
    validade: "15/07/2024",
    imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    categoria: "Roupas",
    urgencia: false,
    ong: "Casa de Menor São Miguel",
    titulo: "Roupas Infantis Variadas",
    quantidade: "50 peças",
    descricao: "Roupas infantis de 1 a 12 anos, incluindo camisetas, calças, vestidos e uniformes escolares. Todas em ótimo estado de conservação.",
    publicado: "12/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    categoria: "Eletrônicos",
    urgencia: false,
    ong: "Fundação Recife Solidária",
    titulo: "Laptops para Educação",
    quantidade: "8 unidades",
    descricao: "Laptops recondicionados em perfeito funcionamento, ideais para programas de inclusão digital e estudos. Incluem carregadores e sistema operacional.",
    publicado: "08/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    categoria: "Móveis",
    urgencia: false,
    ong: "ONG Esperança Verde",
    titulo: "Mobília de Escritório",
    quantidade: "12 peças",
    descricao: "Conjunto de móveis de escritório incluindo mesas, cadeiras, armários e estantes. Móveis em madeira, bem conservados e funcionais.",
    publicado: "05/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    categoria: "Brinquedos",
    urgencia: false,
    ong: "Associação Mãos Amigas",
    titulo: "Brinquedos Educativos",
    quantidade: "30 unidades",
    descricao: "Brinquedos didáticos para crianças de 3 a 10 anos. Incluem jogos de montar, quebra-cabeças, livros de colorir e material pedagógico.",
    publicado: "01/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    categoria: "Medicamentos",
    urgencia: true,
    ong: "Centro Social São José",
    titulo: "Medicamentos Diversos",
    quantidade: "100 unidades",
    descricao: "Medicamentos diversos incluindo analgésicos, antitérmicos, vitaminas e suplementos. Na validade.",
    publicado: "28/06/2024",
    validade: "28/08/2024",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tRaFtNEgYlMJBCzXBUr8r_SIc8tqdTx-sg&s",
  },
  {
    id: 7,
    categoria: "Material Escolar",
    urgencia: false,
    ong: "Instituto Recife Educação",
    titulo: "Material Escolar Completo",
    quantidade: "40 kits",
    descricao: "Kits de material escolar completo com cadernos, lápis, canetas, borrachas, réguas, cola e mochilas. Ideal para estudantes do ensino fundamental.",
    publicado: "01/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    categoria: "Livros",
    urgencia: false,
    ong: "Biblioteca Comunitária Recife",
    titulo: "Livros Didáticos e Literatura",
    quantidade: "200 exemplares",
    descricao: "Coleção de livros didáticos do ensino fundamental e médio, além de literatura infantil e juvenil. Todos os livros estão em excelente estado.",
    publicado: "08/06/2024",
    validade: "",
    imagem: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
  },
];

function App() {
  // No futuro, basta trocar itensMock por dados vindos da API
  return <RealocacaoListagem itens={itensMock} />;
}

export default App;*/