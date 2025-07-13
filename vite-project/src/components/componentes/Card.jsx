import React from 'react';
import './Card.css';

const Card = ({ imageUrl, category, title, location }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      </div>
      <div className="card-content">
        <p className="card-category">{category || 'Categoria'}</p>
        <h3 className="card-title">{title || 'Título do Item'}</h3>
        <p className="card-location">{location || 'Localização'}</p>
      </div>
    </div>
  );
};

export default Card;