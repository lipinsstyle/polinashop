import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import ProductCard from './ProductCard';
import HeroBanner from './HeroBanner';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  // Состояние фильтров
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [inStock, setInStock] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Применение фильтров
  const applyFilters = () => {
    setAppliedFilters({
      priceFrom: parseFloat(priceFrom) || 0,
      priceTo: parseFloat(priceTo) || Infinity,
      inStock,
    });
  };

  // Очистка всех фильтров
  const clearAllFilters = () => {
    setPriceFrom('');
    setPriceTo('');
    setInStock(false);
    setAppliedFilters({});
  };

  // Очистка ценового фильтра
  const clearPriceFilter = () => {
    setPriceFrom('');
    setPriceTo('');
    setAppliedFilters(prev => ({ ...prev, priceFrom: 0, priceTo: Infinity }));
  };

  // Фильтрация товаров
  const filteredProducts = favorites.filter(product => {
    const price = parseFloat(product.price?.toString().replace(',', '.'));
    return (
      (!appliedFilters.priceFrom || price >= appliedFilters.priceFrom) &&
      (!appliedFilters.priceTo || price <= appliedFilters.priceTo) &&
      (appliedFilters.inStock ? true : true)
    );
  });

  return (
    <div className="favorites-page">
      <HeroBanner />
      <div className="container">
        <div style={{ margin: '0 0 36px 0', position: 'relative', display: 'inline-block' }}>
          <h2 style={{
            margin: 0,
            fontSize: '36px',
            fontWeight: 900,
            color: '#1A1D1B',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            zIndex: 2,
            position: 'relative',
            paddingRight: 15,
            paddingBottom: 4
          }}>
            Избранное
          </h2>
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '76%',
            height: 7,
            borderRadius: 5,
            background: 'linear-gradient(90deg, #FF6B35 0%, #FF982F 100%)',
            opacity: 0.17,
            zIndex: 1
          }}></div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {/* SIDEBAR С ФИЛЬТРАМИ */}
          <div style={{
            minWidth: 300,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(44,200,150,0.07)',
            border: '1px solid #ececec',
            padding: 28,
          }}>
            <h3 style={{
              margin: '0 0 24px 0', fontSize: 22, fontWeight: 900, color: '#141414', letterSpacing: '-0.02em'
            }}>Фильтр</h3>
            {/* Фильтр цены */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 15, color: '#222', fontWeight: 700, marginBottom: 10 }}>
                Цена
              </label>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <input
                  type="number"
                  value={priceFrom}
                  onChange={e => setPriceFrom(e.target.value)}
                  placeholder="от"
                  style={{ flex: 1, padding: 10, borderRadius: 8, background: '#fff', border: '1.7px solid #ececec', boxShadow: 'none', fontSize: 16, color: '#222', fontWeight: 700 }}
                />
                <span style={{ color: '#888', fontWeight: 700 }}>—</span>
                <input
                  type="number"
                  value={priceTo}
                  onChange={e => setPriceTo(e.target.value)}
                  placeholder="до"
                  style={{ flex: 1, padding: 10, borderRadius: 8, background: '#fff', border: '1.7px solid #ececec', boxShadow: 'none', fontSize: 16, color: '#222', fontWeight: 700 }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceFrom || 0}
                onChange={e => setPriceFrom(e.target.value)}
                style={{
                  width: '100%', height: 9, borderRadius: 6,
                  background: 'linear-gradient(90deg, #FF6B35 0%, #FFB396 100%)', marginBottom: 0,
                  accentColor: '#FF6B35'
                }}
              />
            </div>
            {/* Фильтр наличия */}
            <div style={{ marginBottom: 26 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: '#222', fontWeight: 700 }}>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                  style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid #ececec', accentColor: '#FF6B35', marginRight: 4 }}
                />
                В наличии
              </label>
            </div>
            {/* Кнопки */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={clearAllFilters}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 8, background: '#f7faf6', color: '#222', border: '1.4px solid #e1eede', fontWeight: 700, fontSize: 15, cursor: 'pointer'
                }}
              >Очистить</button>
              <button
                onClick={applyFilters}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 8, background: '#FF6B35', color: '#fff', border: 'none', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 18px rgba(255, 107, 53, 0.13)'
                }}
              >Применить</button>
            </div>
          </div>

          {/* КОНТЕНТ С ТОВАРАМИ */}
          <div style={{ flex: 2, minWidth: '800px' }}>
            {/* Активный фильтр */}
            {appliedFilters.priceFrom > 0 && (
              <div style={{
                display: 'flex', gap: '8px', alignItems: 'center', background: '#e8f5e8', padding: '8px 12px', borderRadius: '4px', marginBottom: '16px',
              }}>
                <span>Цена от {appliedFilters.priceFrom} до {appliedFilters.priceTo}</span>
                <button
                  onClick={clearPriceFilter}
                  style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: '14px' }}
                >
                  ×
                </button>
              </div>
            )}
            {/* Сетка товаров */}
            <div className="favorites-grid">
              {filteredProducts.length === 0 ? (
                <p style={{ width: '100%', textAlign: 'center', color: '#999' }}>
                  Избранное пусто
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    price={product.price}
                    title={product.title}
                    rating={product.rating}
                    onAddToCart={() => console.log('В корзину:', product.title)}
                    onToggleFavorite={() => toggleFavorite(product)}
                    isFavorite={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;