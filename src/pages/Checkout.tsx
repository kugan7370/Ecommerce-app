import { Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {

  const {cart,updateQuantity,removeFromCart,shippingCost,subtotal,tax,total,taxRate}= useCart();
 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3" /> Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center border-b py-4 space-y-4 sm:space-y-0"
              >
                {/* Product Image */}
                <div className="w-24 h-24 mr-4">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.size ? `Size: ${item.size} | ` : ''} {item.color ? `Color: ${item.color}` : ''}
                      </p>
                      <p className="text-blue-600 font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-gray-100 rounded-l-md"
                      >
                        <Minus size={16} />
                      </button>
                      <p className="w-12 text-center" >{item.quantity}</p>
                       
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-gray-100 rounded-r-md"
                      >
                        <Plus size={16} />
                      </button>

                      {/* Remove Item */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Tax ({`${taxRate*100}%`})</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            disabled={cart.length === 0}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-50"
          >
            <CreditCard className="mr-2" />
            Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;