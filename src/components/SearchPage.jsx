import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from './ProductsContext';
import ProductCard from './ProductCard';
import './SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchParams, searchProducts]);

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-page__header">
          <button className="search-page__back" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад
          </button>
        </div>

        <div className="search-page__content">
          {searchQuery.trim() === '' ? (
            <div className="search-page__empty">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="50" cy="50" r="30" stroke="#D1E7DD" strokeWidth="6"/>
                <line x1="72" y1="72" x2="95" y2="95" stroke="#D1E7DD" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="15" fill="#E8F5E9"/>
              </svg>
              <h2>Начните поиск товаров</h2>
              <p>Используйте строку поиска в шапке сайта</p>
              <div className="search-page__hint">
                <div className="hint-item">
                  <span className="hint-icon">🥛</span>
                  <span>Молоко</span>
                </div>
                <div className="hint-item">
                  <span className="hint-icon">🥩</span>
                  <span>Колбаса</span>
                </div>
                <div className="hint-item">
                  <span className="hint-icon">🥞</span>
                  <span>Блинчики</span>
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="search-page__title-wrapper">
                <h2 className="search-page__title">
                  Результаты по запросу <span className="search-query">«{searchQuery}»</span>
                </h2>
                <div className="search-page__count">Найдено товаров: {searchResults.length}</div>
              </div>
              <div className="search-page__results">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </>
          ) : (
            <div className="search-page__empty">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="50" cy="50" r="30" stroke="#FFE0E0" strokeWidth="6"/>
                <line x1="72" y1="72" x2="95" y2="95" stroke="#FFE0E0" strokeWidth="6" strokeLinecap="round"/>
                <line x1="40" y1="50" x2="60" y2="50" stroke="#FFB8B8" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="42" cy="42" r="3" fill="#FFB8B8"/>
                <circle cx="58" cy="42" r="3" fill="#FFB8B8"/>
              </svg>
              <h2>Ничего не найдено</h2>
              <p>По запросу <span className="search-page__query">«{searchQuery}»</span> ничего не найдено</p>
              <p className="search-page__suggestion">Попробуйте изменить запрос или проверьте правильность написания</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

