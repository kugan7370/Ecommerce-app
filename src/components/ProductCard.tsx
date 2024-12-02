import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => {

  
    const navigate = useNavigate();
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300"  onClick={() => navigate(`/productDetails/${product.id}`)}> 
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-contain"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
           
          </div>
          <button 
              onClick={() => onAddToCart(product)}
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