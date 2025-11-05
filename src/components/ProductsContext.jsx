import React, { createContext, useContext } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  // Все товары магазина
  const allProducts = [
    {
      id: 1,
      image: '/assets/images/pancakes.png',
      title: 'Г/Ц Блинчики с мясом вес. Россия',
      price: '44,50',
      oldPrice: '50,50',
      discount: '-12%',
      category: 'Готовая еда',
    },
    {
      id: 2,
      image: '/assets/images/milk1.png',
      title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное',
      price: '64,90',
      oldPrice: '79,90',
      discount: '-19%',
      category: 'Молочные продукты',
    },
    {
      id: 3,
      image: '/assets/images/colbasa.png',
      title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ',
      price: '199,00',
      oldPrice: '249,00',
      discount: '-20%',
      category: 'Мясо и колбасы',
    },
    {
      id: 4,
      image: '/assets/images/sausages.png',
      title: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ',
      price: '159,00',
      oldPrice: '189,00',
      discount: '-16%',
      category: 'Мясо и колбасы',
    },
    {
      id: 5,
      image: '/assets/images/palka.png',
      title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
      price: '599,99',
      isNew: true,
      category: 'Техника',
    },
    {
      id: 6,
      image: '/assets/images/vetchina.png',
      title: 'Ветчина варёная',
      price: '77,99',
      boughtBefore: true,
      category: 'Мясо и колбасы',
    },
    {
      id: 7,
      image: '/assets/images/pancakes.png',
      title: 'Блинчики с творогом',
      price: '42,00',
      oldPrice: '48,00',
      discount: '-13%',
      category: 'Готовая еда',
    },
    {
      id: 8,
      image: '/assets/images/milk1.png',
      title: 'Кефир ПРОСТОКВАШИНО 3,2%',
      price: '59,90',
      category: 'Молочные продукты',
      isNew: true,
    },
    {
      id: 9,
      image: '/assets/images/colbasa.png',
      title: 'Колбаса варёная Докторская',
      price: '189,00',
      oldPrice: '219,00',
      discount: '-14%',
      category: 'Мясо и колбасы',
    },
    {
      id: 10,
      image: '/assets/images/sausages.png',
      title: 'Сардельки свиные',
      price: '169,00',
      category: 'Мясо и колбасы',
      boughtBefore: true,
    },
    {
      id: 11,
      image: '/assets/images/milk1.png',
      title: 'Сметана 20% ПРОСТОКВАШИНО',
      price: '89,90',
      oldPrice: '99,90',
      discount: '-10%',
      category: 'Молочные продукты',
    },
    {
      id: 12,
      image: '/assets/images/vetchina.png',
      title: 'Ветчина из индейки',
      price: '199,00',
      isNew: true,
      category: 'Мясо и колбасы',
    },
    {
      id: 13,
      image: '/assets/images/milk1.png',
      title: 'Йогурт молочный питьевой',
      price: '54,90',
      category: 'Молочные продукты',
    },
    {
      id: 14,
      image: '/assets/images/pancakes.png',
      title: 'Блинчики с вишней',
      price: '39,90',
      oldPrice: '45,00',
      discount: '-11%',
      category: 'Готовая еда',
    },
    {
      id: 15,
      image: '/assets/images/milk1.png',
      title: 'Творог 5% ПРОСТОКВАШИНО',
      price: '79,90',
      category: 'Молочные продукты',
    },
    {
      id: 16,
      image: '/assets/images/colbasa.png',
      title: 'Колбаса Салями',
      price: '229,00',
      isNew: true,
      category: 'Мясо и колбасы',
    },
    {
      id: 17,
      image: '/assets/images/milk1.png',
      title: 'Молоко топлёное 3,2%',
      price: '69,90',
      category: 'Молочные продукты',
    },
    {
      id: 18,
      image: '/assets/images/sausages.png',
      title: 'Сосиски молочные',
      price: '149,00',
      oldPrice: '169,00',
      discount: '-12%',
      category: 'Мясо и колбасы',
    },
  ];

  // Функция поиска товаров
  const searchProducts = (query) => {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    
    return allProducts.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(searchQuery);
      const categoryMatch = product.category.toLowerCase().includes(searchQuery);
      return titleMatch || categoryMatch;
    });
  };

  // Получение товаров с акциями
  const getDiscountedProducts = () => {
    return allProducts.filter(product => product.discount);
  };

  // Получение новинок
  const getNewProducts = () => {
    return allProducts.filter(product => product.isNew);
  };

  // Получение товаров "Покупали раньше"
  const getBoughtBeforeProducts = () => {
    return allProducts.filter(product => product.boughtBefore);
  };

  const value = {
    allProducts,
    searchProducts,
    getDiscountedProducts,
    getNewProducts,
    getBoughtBeforeProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

