import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; 

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartContextType {
  cart: CartItem[];
  addCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  shippingCost: number;
  taxRate: number;
  subtotal: number;
  tax: number;
  total: number;

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);


  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.id}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]); 
      }
    }
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

 
  const addCart = (item: CartItem) => {
    console.log('Adding item to cart:', item);
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };


  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

 
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const shippingCost = cart.length > 0 ? 9.99 : 0;
  const taxRate = 0.08;
  const subtotal = calculateTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;


  const contextValue: CartContextType = {
    cart,
    addCart,
    updateQuantity,
    removeFromCart,
    shippingCost,
    taxRate,
    subtotal,
    tax,
    total, 
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
