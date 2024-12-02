import ProductCard from '../components/ProductCard';
import productsData from '../data/productData';
import { useCart } from '../contexts/CartContext';


const Product = () => {
    const {addCart} = useCart();

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productsData.length>0 && productsData.map(product => (
          <ProductCard
            key={product.id} 
            product={product} 
            onAddToCart={addCart}
          />
        ))}
      </div>

    </div>
  );
};

export default Product;