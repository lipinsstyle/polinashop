import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles.css';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SectionBlock from './components/SectionBlock';
import ProductCard from './components/ProductCard';
import SpecialOffers from './components/SpecialOffers';
import StoreLocations from './components/StoreLocations';
import ArticlesSection from './components/ArticlesSection';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import { ProductsProvider, useProducts } from './components/ProductsContext';
import { FavoritesProvider } from './components/FavoritesContext';
import CartPage from './components/CartPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';

const HomePage = () => {
  const { getDiscountedProducts, getNewProducts, getBoughtBeforeProducts } = useProducts();
  
  const discountedProducts = getDiscountedProducts();
  const newProducts = getNewProducts();
  const boughtBeforeProducts = getBoughtBeforeProducts();

  return (
    <div className="app-root">
      <HeroBanner />
      <SectionBlock title="Акции" rightLink={{ href: '#', text: 'Все акции' }}>
        {discountedProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </SectionBlock>
      <SectionBlock title="Новинки" rightLink={{ href: '#', text: 'Все новинки' }}>
        {newProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </SectionBlock>
      <SectionBlock title="Покупали раньше" rightLink={{ href: '#', text: 'Все покупки' }}>
        {boughtBeforeProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </SectionBlock>
      <SpecialOffers />
      <StoreLocations />
      <ArticlesSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  );
}

export default App;
