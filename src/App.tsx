import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/Checkout";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext ";
import { FilterProvider } from "./contexts/FilterContext";

function App() {

  return (
    <AuthProvider>
      <CartProvider>
      <SearchProvider>
      <FilterProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </FilterProvider>
      </SearchProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
