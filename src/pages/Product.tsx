import ProductCard from '../components/ProductCard';
import productsData from '../data/productData';
import { useCart } from '../contexts/CartContext';
import { useSearch } from '../contexts/SearchContext ';
import { useFilter } from '../contexts/FilterContext';
import { useEffect, useState } from 'react';
import { IProduct } from '../types/product';

const Product = () => {
    const {addCart} = useCart();

    const { searchQuery } = useSearch();
    const { filters } = useFilter();

  
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    
    useEffect(() => {
      const filteredProducts = productsData.filter((product) => {
          const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
          const categoryMatch = filters.category === '' || product.category === filters.category;
          const priceRange = filters.priceRange === '' ? true : filters.priceRange === '0-50' ? product.price <= 50 : filters.priceRange === '50-100' ? product.price > 50 && product.price <= 100 : filters.priceRange === '100-500' ? product.price > 100 && product.price <= 500 : product.price > 500;
  
          return searchMatch && categoryMatch && priceRange;
      }).sort((a, b) => {
          if (filters.sortBy === 'price-low') return a.price - b.price;
          if (filters.sortBy === 'price-high') return b.price - a.price;
          return a.id - b.id;
      });
      setFilteredProducts(filteredProducts);
  }, [searchQuery, filters]);
 


 
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length>0 && filteredProducts.map(product => (
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