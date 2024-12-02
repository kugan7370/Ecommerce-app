import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Leather Jacket',
      price: 249.99,
      quantity: 1,
      image: 'https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123',
      size: 'M',
      color: 'Black'
    },
    {
      id: 2,
      name: 'Sneakers',
      price: 129.99,
      quantity: 2,
      image: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
      size: '42',
      color: 'White'
    }
  ]);

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // Remove an item from cart
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total cost
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Shipping and tax calculations
  const shippingCost = cartItems.length > 0 ? 9.99 : 0;
  const taxRate = 0.08; // 8% tax
  const subtotal = calculateTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3" /> Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center border-b py-4 space-y-4 sm:space-y-0"
              >
                {/* Product Image */}
                <div className="w-24 h-24 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600">
                        Size: {item.size} | Color: {item.color}
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
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-12 text-center border-t border-b"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-gray-100 rounded-r-md"
                      >
                        <Plus size={16} />
                      </button>

                      {/* Remove Item */}
                      <button 
                        onClick={() => removeItem(item.id)}
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
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            disabled={cartItems.length === 0}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-50"
          >
            <CreditCard className="mr-2" />
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Additional Checkout Options */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Checkout Options</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping Method */}
          <div>
            <h3 className="font-semibold mb-4">Shipping Method</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="shipping" 
                  className="mr-2" 
                  defaultChecked 
                />
                Standard Shipping (3-5 business days)
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="shipping" 
                  className="mr-2" 
                />
                Express Shipping (1-2 business days)
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  className="mr-2" 
                  defaultChecked 
                />
                Credit Card
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  className="mr-2" 
                />
                PayPal
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;