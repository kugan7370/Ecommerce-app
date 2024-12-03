import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IProductCardProps } from '../types/product';
import { useAuth } from '../contexts/AuthContext';


const ProductCard = ({ product, onAddToCart }:IProductCardProps) => {
  const { isAuthenticated } = useAuth();
  
    const navigate = useNavigate();
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300"  > 
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-contain"
          onClick={() => navigate(`/productDetails/${product.id}`)}
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
           
          </div>
          <button 
              onClick={() => isAuthenticated? onAddToCart({...product, quantity: 1, size: product?.sizes[0] || null, color: product?.colors[0].name || null}):navigate('/login')}
              className="bg-blue-500 w-full mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </button>
        </div>
      </div>
    );
  }

export default ProductCard;