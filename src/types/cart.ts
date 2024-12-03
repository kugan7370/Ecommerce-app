import { IProduct } from "./product";

export interface ICartItem extends IProduct {
    selectedSize?: string;
    selectedColor?: string;
    quantity: number;
 

  }

 export interface ICartContextType {
    cart: ICartItem[];
    addCart: (item: ICartItem) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    shippingCost: number;
    taxRate: number;
    subtotal: number;
    tax: number;
    total: number;
    
  }