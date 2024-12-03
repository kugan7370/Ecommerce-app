export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes?: string[];
    colors: { name: string; hex: string }[];
    reviews: { id: number; name: string; rating: number; date: string; comment: string }[];
    inStock: boolean;
    stockQuantity: number;
    category: string;
  }
  
export interface IProductCardProps {
    product: IProduct;
    onAddToCart: (product: Partial<IProduct>) => void;
  }