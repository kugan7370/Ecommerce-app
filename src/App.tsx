import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/Checkout";

function App() {

  return (
    <Router>
    <Navbar />
    <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/productDetails/:id" element={<ProductDetails/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
          </Routes>
  </Router>
  )
}

export default App;
