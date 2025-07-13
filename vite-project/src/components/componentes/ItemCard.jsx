import React from 'react';
import ItemCard from './ItemCard';
import './Listagem.css';

// Coloque o array mockItens que definimos no início aqui ou importe de outro arquivo
const mockItens = [ /* ... cole os dados aqui ... */ ];

const ListagemPage = () => {
  return (
    <div className="listagem-page">
      <header className="listagem-header">
        <h1>Doe com Propósito</h1>
        <p>
          Cada item solicitado por uma ONG representa uma vida que pode ser melhorada.
          Navegue pelas necessidades de doação para encontrar a doação que faz a
          solidariedade acontecer em nossa cidade.
        </p>
      </header>

      <div className="filtros-bar">
        {/* Aqui entrariam os componentes de filtro, por enquanto placeholders */}
        <button className="filtro-btn">Filtros</button>
        <input type="text" placeholder="Buscar item..." className="filtro-input" />
        <select className="filtro-select">
          <option>Categorias</option>
        </select>
        <select className="filtro-select">
          <option>Urgência</option>
        </select>
      </div>

      <p className="itens-encontrados">{mockItens.length} itens encontrados</p>

      <main className="grid-container">
        {mockItens.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </main>

      <div className="paginacao">
        <span>&lt;</span>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>67</span>
        <span>68</span>
        <span>&gt;</span>
      </div>

      <footer className="info-footer">
        <h3>Você sabia?</h3>
        <p>
          Milhares de ONGs no Brasil enfrentam dificuldades para captar doações e divulgar suas necessidades.
        </p>
      </footer>
    </div>
  );
};

export default ListagemPage;    