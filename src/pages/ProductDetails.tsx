import React, { useEffect, useState } from 'react';
import { Star, ShoppingCart, CheckCircle, Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import productsData from '../data/productData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { IProduct } from '../types/product';
const ProductDetails = () => {
  const {isAuthenticated}=useAuth();

  const { id } = useParams();

  const {addCart} = useCart();

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundProduct = productsData.find(product => product.id === Number(id));
        
        if (foundProduct) {
          
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);


 




  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }
   

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-96 object-contain rounded-lg shadow-md"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product?.images && product?.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.name} view ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer 
                  ${selectedImage === index ? 'border-2 border-blue-500' : 'opacity-70'}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Price and Stock */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              {product.inStock ? (
                <><CheckCircle className="text-green-500 mr-2" /> In Stock</>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Sizes */}
          <div className="mb-4">
         {product.sizes && <h3 className="font-semibold mb-2">Select Size</h3>}
            <div className="flex space-x-2">
              {product.sizes  && product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md 
                    ${selectedSize === size 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Color</h3>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 
                    ${selectedColor === color.name 
                      ? 'border-blue-500 scale-110' 
                      : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 text-center"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>

            <button 
              className="flex-grow flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
              // disabled={!selectedSize || !selectedColor}
              onClick={() => isAuthenticated ? addCart({...product, quantity, size: selectedSize, color: selectedColor}):navigate('/login') }
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </button>

            <button className="p-3 hover:text-red-500">
              <Heart />
            </button>
          </div>

          {/* Warning if size/color not selected */}
          {(!selectedSize || !selectedColor) && (
            <p className="text-red-500 text-sm mb-4">
              Please select size and color before adding to cart
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {product.reviews.map(review => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;