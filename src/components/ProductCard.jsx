import React from 'react';
import './ProductCard.css';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';
import { useCart } from './CartContext';
import { useFavorites } from './FavoritesContext';

const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};

const ProductCard = ({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category }) => {
  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const imgName = image.split('/').pop();
  const imgSrc = images[imgName] || image;
  
  // Проверяем — есть ли товар уже в корзине
  const inCart = cart.some(item => item.id === id || item.title === title);
  const favorite = isFavorite(id);

  const handleAdd = () => {
    if (!inCart) addToCart({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category });
  };

  return (
    <div className="product-card">
      {discount && <div className="product-card__discount">{discount}</div>}
      {isNew && <div className="product-card__new">Новинка</div>}
      {boughtBefore && <div className="product-card__bought">Покупали раньше</div>}
      
      <button 
        className={`product-card__favorite ${favorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label="Пометить как избранное"
      >
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 28s-7.602-6.112-10.401-9.04C3.246 17.302 2 15.225 2 12.993 2 9.134 6.134 6 9.993 6c2.109 0 4.174 1.008 6.007 2.713C17.833 7.008 19.899 6 22.007 6 25.866 6 30 9.134 30 12.993c0 2.232-1.246 4.309-3.599 6.017C23.602 21.888 16 28 16 28z"
            fill={favorite ? '#FF6B35' : 'none'}
            stroke={favorite ? '#fff' : '#FF6B35'}
            strokeWidth={favorite ? '2.6' : '2'}
            style={{ filter: 'drop-shadow(0 2px 10px rgba(255,91,53,0.10))' }}
          />
        </svg>
      </button>

      <img src={imgSrc} alt={title} className="product-card__img" />
      <div className="product-card__info">
        <div className="product-card__title">{title}</div>
        <div className="product-card__prices">
          <span className="product-card__price">{price} ₽</span>
          {oldPrice && <span className="product-card__old-price">{oldPrice} ₽</span>}
        </div>
        <button
          className={`product-card__btn${inCart ? ' in-cart' : ''}`}
          onClick={handleAdd}
          disabled={inCart}
        >
          {inCart ? 'В корзине' : 'В корзину'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
