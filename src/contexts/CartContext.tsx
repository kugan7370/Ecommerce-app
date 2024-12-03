import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {toast} from 'react-toastify';
import { ICartContextType, ICartItem } from '../types/cart';



const CartContext = createContext<ICartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.id}`);
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          setCart([]);
        }
      } else {
        setCart([]);
        localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify([]));
      }
    } else {
      setCart([]); 
    }
  }, [currentUser]);

  
  useEffect(() => {
    if (currentUser) {
      const saveCart = () => {
        try {
          localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        } catch (error) {
          console.error('Error saving cart to localStorage:', error);
        }
      };

      const timeout = setTimeout(saveCart, 300); 
      return () => clearTimeout(timeout);
    }
  }, [cart, currentUser]);

  const addCart = (item: ICartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // return prevCart.map((cartItem) =>
        //   cartItem.id === item.id
        //     ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        //     : cartItem
        // );
        toast.error('Product already in cart');
        return prevCart;
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
    return cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
  };

  const shippingCost = cart.length > 0 ? 9.99 : 0;
  const taxRate = 0.08;
  const subtotal = calculateTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  const contextValue: ICartContextType = {
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
