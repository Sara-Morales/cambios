import React, { useState, useEffect } from 'react';
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
import Checkout from './Checkout/Checkout';
import AdminPanel from './Admin/AdminPanel';
import AdminNavbar from './Admin/AdminNavbar';

function App() {
  const [allProducts, setAllProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [countProducts, setCountProducts] = useState(0);
  const [total, setTotal] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(allProducts));
  }, [allProducts]);

  const updateCartItem = (updatedItem) => {
    const updatedProducts = allProducts.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setAllProducts(updatedProducts);
    updateCartSummary(updatedProducts);
  };

  const removeCartItem = (itemId) => {
    const updatedProducts = allProducts.filter(item => item.id !== itemId);
    setAllProducts(updatedProducts);
    updateCartSummary(updatedProducts);
  };

  const updateCartSummary = (products) => {
    const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCountProducts(totalItems);
    setTotal(totalPrice);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <AdminNavbar />
                <AdminPanel products={allProducts} setProducts={setAllProducts} />
              </>
            }
          />
          <Route
            path="/shopping"
            element={<ShoppingCartNavbar countProducts={countProducts} />}
          />
          <Route
            path="*"
            element={<NavigationBar countProducts={countProducts} isAdmin={isAdmin} logout={logout} />}
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
                products={allProducts}
                setProducts={setAllProducts}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                total={total}
                setTotal={setTotal}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={<Cart 
              cartItems={allProducts} 
              updateCartItem={updateCartItem} 
              removeCartItem={removeCartItem} 
            />} 
          />
          <Route 
            path="/checkout" 
            element={<Checkout cartItems={allProducts} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
