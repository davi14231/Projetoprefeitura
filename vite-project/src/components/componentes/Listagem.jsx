import React from 'react';
import './Listagem.css'; // Usaremos um CSS compartilhado

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="card-image-placeholder">
        <span>Imagem do Item</span>
      </div>
      <div className="card-content">
        <span className="card-categoria">{item.categoria}</span>
        <p className="card-ong">{item.ong}</p>
        <h3 className="card-titulo">{item.titulo}</h3>
        <p className="card-quantidade">{item.quantidade}</p>
        <p className="card-descricao">{item.descricao}</p>
        <p className="card-data">Publicado em {item.dataPublicacao}</p>
      </div>
    </div>
  );
};

export default ItemCard;