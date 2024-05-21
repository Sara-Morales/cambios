import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Home/Navbar';
import ShoppingCartNavbar from './HomeProductos/ShoppingCartNavbar';
import Hero from './Home/Hero';
import About from './Home/About';
import Services from './Home/Services';
import Developers from './Home/Developers';
import Footer from './Home/Footer';
import Signup from './Cuenta_usuario/Signup/Signup';
import ProductList from './HomeProductos/Productos';
import Cart from './Cart/Cart';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/shopping"
            element={<ShoppingCartNavbar countProducts={countProducts} />}
          />
          <Route
            path="*"
            element={<NavigationBar countProducts={countProducts} />}
          />
        </Routes>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Developers />
              <Footer />
            </>
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/shopping" 
            element={
              <ProductList 
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                total={total}
                setTotal={setTotal}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={<Cart cartItems={allProducts} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
