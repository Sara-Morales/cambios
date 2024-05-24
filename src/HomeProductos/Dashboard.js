import React, { useState } from "react";
import AdminPanel from "../Admin/AdminPanel";
import ProductList from "./Productos";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <AdminPanel products={products} setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
