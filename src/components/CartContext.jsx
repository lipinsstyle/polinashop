import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(item => item.title === product.title);
      if (found) {
        return prev.map(item =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(title) {
    setCart(prev => prev.filter(item => item.title !== title));
  }

  function decreaseFromCart(title) {
    setCart(prev => {
      return prev
        .map(item =>
          item.title === title ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
    });
  }

  function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartCount, removeFromCart, decreaseFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
