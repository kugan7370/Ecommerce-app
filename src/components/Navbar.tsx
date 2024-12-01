import { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import {  NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <NavLink to={'/'} className="text-2xl font-bold text-blue-600">
              MyStore
            </NavLink>
          </div>

          {/* Navigation Links - Middle Hidden for large */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink 
              to="/" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              Products
            </NavLink>
          </div>

          {/* Right Side - Sign In and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/signin" 
              className="flex items-center text-gray-800 hover:text-blue-600 transition duration-300"
            >
              <User className="mr-2" size={20} />
              Sign In
            </NavLink>
            <NavLink
              to="/checkout" 
              className="relative flex items-center text-gray-800 hover:text-blue-600 transition duration-300"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <NavLink 
                to="/" 
                className="block text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
              >
                Home
              </NavLink>
              <NavLink
                to="/products" 
                className="block text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
              >
                Products
              </NavLink>
              <div className="border-t pt-2">
                <NavLink 
                  to="/signin" 
                  className="flex items-center text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
                >
                  <User className="mr-2" size={20} />
                  Sign In
                </NavLink>
                <NavLink 
                  to="/checkout" 
                  className="relative flex items-center text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Cart
                  <span className="absolute right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    0
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;