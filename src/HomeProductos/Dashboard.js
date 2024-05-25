import React, { useState, useEffect } from "react";
import AdminPanel from "../Admin/AdminPanel";
import ProductList from "./Productos";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleUpdateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <div>
      <AdminPanel products={products} setProducts={handleUpdateProducts} />
      <ProductList
        products={products}
        setProducts={setProducts}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        total={total}
        setTotal={setTotal}
      />
    </div>
  );
};

export default Dashboard;
