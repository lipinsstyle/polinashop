import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../assets/images/logo.png';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';
import { useCart } from './CartContext';
import { useProducts } from './ProductsContext';
import { useFavorites } from './FavoritesContext';
import AuthModal from './AuthModal';

const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { searchProducts } = useProducts();
  const { getFavoritesCount } = useFavorites();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const profileMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Загружаем пользователя из localStorage при монтировании
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (isProfileMenuOpen || showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen, showSuggestions]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearch = (e, query = searchQuery) => {
    if (e) e.preventDefault();
    const searchTerm = query.trim();
    if (searchTerm) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestionIndex(-1);
    
    if (value.trim().length > 0) {
      const results = searchProducts(value);
      // Ограничиваем подсказки до 5 товаров
      setSearchSuggestions(results.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < searchSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        const selectedProduct = searchSuggestions[selectedSuggestionIndex];
        handleSearch(null, selectedProduct.title);
      } else {
        handleSearch(e);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.title);
    handleSearch(null, product.title);
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <header className="shop-header">
      <div className="container header__container-flex">
        <div className="header__left">
          <div className="header__logo-block" onClick={() => navigate("/")}> 
            <img src={logo} alt="Северяночка" className="header__logo" />
          </div>
          <button className="header__catalog-btn" onClick={()=>navigate("/catalog") }>
            <span className="header__catalog-icon">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><rect y="3" width="20" height="2" rx="1" fill="white"/><rect y="9" width="20" height="2" rx="1" fill="white"/><rect y="15" width="20" height="2" rx="1" fill="white"/></svg>
            </span>
            Каталог
          </button>
        </div>
        <div className="header__center">
          <div className="header__search-wrapper" ref={searchRef}>
            <form className="header__search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Найти товар"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              />
              <button type="submit" className="header__search-icon">
                <svg height="20" width="20" fill="none" stroke="#7AC86A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>
            
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="header__search-dropdown">
                {searchSuggestions.map((product, index) => {
                  const imgName = product.image.split('/').pop();
                  const imgSrc = images[imgName] || product.image;
                  
                  return (
                    <div
                      key={product.id}
                      className={`search-suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(product)}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    >
                      <div className="search-suggestion__image">
                        <img src={imgSrc} alt={product.title} />
                      </div>
                      <div className="search-suggestion__info">
                        <div className="search-suggestion__title">
                          {highlightMatch(product.title, searchQuery)}
                        </div>
                        <div className="search-suggestion__price">{product.price} ₽</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="header__right">
          <nav className="header__nav-icons">
            <div className="header__icon-block header__favorites" onClick={()=>navigate("/favorites") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 21C11.8 21 11.7 21 11.5 20.9C6 16.4 3 13.4 3 9.5C3 6.4 5.4 4 8.5 4C10.1 4 11.6 4.8 12.5 6C13.4 4.8 14.9 4 16.5 4C19.6 4 22 6.4 22 9.5C22 13.4 19 16.4 13.5 20.9C13.3 21 13.2 21 12 21Z" /></svg>
              {getFavoritesCount() > 0 && (
                <span className="header__favorites-count">{getFavoritesCount()}</span>
              )}
              <div className="header__icon-text">Избранное</div>
            </div>
            <div className="header__icon-block" onClick={()=>navigate("/orders") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3H8V7H16V3Z" /></svg>
              <div className="header__icon-text">Заказы</div>
            </div>
            <div className="header__icon-block header__cart" onClick={()=>navigate("/cart") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="8.5" cy="20.5" r="1.5"/><circle cx="17.5" cy="20.5" r="1.5"/><path d="M4 7L6 19H18L20 7H4Z" /><path d="M9 7V4C9 2.9 9.9 2 11 2H13C14.1 2 15 2.9 15 4V7"/></svg>
              <span className="header__cart-count">{getCartCount()}</span>
              <div className="header__icon-text">Корзина</div>
            </div>
          </nav>
          {user ? (
            <div className="header__user-wrapper" ref={profileMenuRef}>
              <div className="header__user-profile" onClick={toggleProfileMenu}>
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="header__user-avatar" />
                ) : (
                  <div className="header__user-avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="header__user-name">{user.name}</span>
                <svg 
                  className={`header__user-arrow ${isProfileMenuOpen ? 'open' : ''}`}
                  width="14" 
                  height="8" 
                  viewBox="0 0 14 8" 
                  fill="none"
                >
                  <path d="M1 1L7 7L13 1" stroke="#232426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {isProfileMenuOpen && (
                <div className="header__profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-dropdown-info">
                      <div className="profile-dropdown-name">{user.name}</div>
                      <div className="profile-dropdown-phone">{user.phone}</div>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider"></div>
                  <button className="profile-dropdown-item" onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/orders');
                  }}>
                    <svg width="20" height="20" fill="none" stroke="#232426" strokeWidth="1.8" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="13" rx="2"/>
                      <path d="M16 3H8V7H16V3Z" />
                    </svg>
                    <span>Мои заказы</span>
                  </button>
                  <button className="profile-dropdown-item" onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/favorites');
                  }}>
                    <svg width="20" height="20" fill="none" stroke="#232426" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M12 21C11.8 21 11.7 21 11.5 20.9C6 16.4 3 13.4 3 9.5C3 6.4 5.4 4 8.5 4C10.1 4 11.6 4.8 12.5 6C13.4 4.8 14.9 4 16.5 4C19.6 4 22 6.4 22 9.5C22 13.4 19 16.4 13.5 20.9C13.3 21 13.2 21 12 21Z" />
                    </svg>
                    <span>Избранное</span>
                  </button>
                  <div className="profile-dropdown-divider"></div>
                  <button className="profile-dropdown-item logout" onClick={handleLogout}>
                    <svg width="20" height="20" fill="none" stroke="#ff6b35" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    <span>Выйти</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="header__login-btn" onClick={() => setIsAuthModalOpen(true)}>
              Войти
            </button>
          )}
        </div>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </header>
  );
};
export default Header;
