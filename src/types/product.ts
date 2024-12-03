import { ICartItem } from "./cart";

export interface IProduct {
    id: number | string;
    name: string;
    price: number|string;
    description: string;
    images: string[] ;
    sizes?: string[];
    colors: { name: string; hex: string }[];
    reviews: { id: number; name: string; rating: number; date: string; comment: string }[];
    inStock: boolean;
    stockQuantity: number;
    category: string;
  }
  
export interface IProductCardProps {
    product: IProduct;
    onAddToCart: (item: ICartItem) => void;
  }