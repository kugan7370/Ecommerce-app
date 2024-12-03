import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/Checkout';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import Providers from './Providers';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
