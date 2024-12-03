import React, { useState, useEffect } from 'react';
import {
  Menu, X, ShoppingCart, User, Search,
  ChevronDown, ChevronUp,
  SlidersHorizontal
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useSearch } from '../contexts/SearchContext ';
import { useFilter } from '../contexts/FilterContext';
import productsData from '../data/productData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const { searchQuery, updateSearchQuery } = useSearch();
  const { filters, updateFilter, applyFilters } = useFilter();


  const { isAuthenticated, logout, currentUser } = useAuth();
  const { cart } = useCart();
  const navigation = useNavigate();
  const location = useLocation();



  // Reset mobile search when navigating
  useEffect(() => {
    setIsMobileSearchOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
  const toggleFilter = () => setIsFilterExpanded(!isFilterExpanded);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const activeFilters = applyFilters();

    const queryParams = new URLSearchParams({
      ...(searchQuery && { search: searchQuery }),
      ...Object.fromEntries(
        Object.entries(activeFilters).map(([key, value]) => [key, value])
      )
    });

    navigation(`/?${queryParams.toString()}`);
  };



  const renderSearchAndFilter = () => {
    return (
      <>
        {/* Mobile view */}
        <div className="md:hidden">
          {isMobileSearchOpen && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="p-4">
                {/* Mobile Search Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Search & Filter</h2>
                  <button
                    onClick={toggleMobileSearch}
                    className="text-gray-800 hover:text-blue-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Search Input */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => updateSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </form>

                {/* Mobile Filters */}
                <div className="space-y-4">
                  {/* Sort By */}
                  <div>
                    <div
                      onClick={toggleFilter}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <label className="text-gray-700 font-medium">Sort & Filter</label>
                      {isFilterExpanded ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {isFilterExpanded && (
                      <div className="space-y-3 mt-2">
                        {/* Sort Options */}
                        <select
                          value={filters.sortBy}
                          onChange={(e) => updateFilter('sortBy', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                        >
                          <option value="">Sort By</option>
                          <option value="price-low">Price: L to H</option>
                          <option value="price-high">Price: H to L</option>
                        </select>

                        {/* Category */}
                        <select
                          value={filters.category}
                          onChange={(e) => updateFilter('category', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                        >
                          <option value="">All Categories</option>
                          {productsData &&
                            [...new Set(productsData.map((product) => product.category))].map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                        </select>

                        {/* Price Range */}
                        <select
                          value={filters.priceRange}
                          onChange={(e) => updateFilter('priceRange', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                        >
                          <option value="">All Prices</option>
                          <option value="0-50">$0 - $50</option>
                          <option value="50-100">$50 - $100</option>
                          <option value="100-500">$100 - $500</option>
                          <option value="500+">$500+</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Apply Filters Button */}
                  <button
                    onClick={handleSearch}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tablet and Desktop view */}
        <div className="hidden md:flex items-center space-x-4 flex-grow justify-center relative">
          <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full h-[38px] px-4 py-2 border rounded-l-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className=" bg-blue-500 h-[38px] text-white px-4 py-2 rounded-r-md flex items-center justify-center hover:bg-blue-600 transition duration-300"
            >
              <Search size={20} />
            </button>

            {/* Filter Dropdown Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="ml-2 h-[38px] flex items-center text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md"
            >
              <div className="h-[38px] w-[38px] p-2 flex justify-center items-center shadow-md rounded-md">
                <SlidersHorizontal size={20} className="mr-1 text-blue-500" />
              </div>

            </button>
          </form>

          {/* Desktop Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute top-full mt-2 w-full max-w-md bg-white border rounded-md shadow-lg p-4 z-50">
              <div className="grid grid-cols-3 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-2 py-1 border rounded-md text-sm"
                  >
                    <option value="">Select Sort</option>
                    <option value="price-low">Price: L to H</option>
                    <option value="price-high">Price: H to L</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-2 py-1 border rounded-md text-sm"
                  >
                    <option value="">All Categories</option>
                    {productsData &&
                      [...new Set(productsData.map((product) => product.category))].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="w-full px-2 py-1 border rounded-md text-sm"
                  >
                    <option value="">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500+">$500+</option>
                  </select>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="mt-4">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to={'/'} className="text-2xl font-bold text-blue-600">
              MyStore
            </NavLink>
          </div>

          {/* Search Section */}
          {renderSearchAndFilter()}

          {/* Mobile/Tablet Search & Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMobileSearch}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <Search size={24} />
            </button>

            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Right Section */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">

              <div
                onClick={() => {
                  logout();
                  navigation('/login');
                }}
                className="flex items-center cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300"
              >
                <h1 className='uppercase mr-2 font-semibold'>
                  {currentUser?.name}
                </h1>
              </div>
              <NavLink
                to="/checkout"
                className="relative flex items-center text-gray-800 hover:text-blue-600 transition duration-300"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cart.length || 0}
                </span>
              </NavLink>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4 cursor-pointer">
              <NavLink
                to="/login"
                className="flex items-center text-gray-800 hover:text-blue-600 transition duration-300"
              >
                <User className="mr-2" size={20} />
                Sign In
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
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

              {isAuthenticated ? (
                <>
                  <div
                    onClick={() => {
                      logout();
                      navigation('/login');
                    }}
                    className="block text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
                  >
                    Sign Out
                  </div>
                  <NavLink
                    to="/checkout"
                    className="block text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
                  >
                    Cart ({cart.length || 0})
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="block text-gray-800 hover:bg-blue-50 px-3 py-2 rounded-md"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;