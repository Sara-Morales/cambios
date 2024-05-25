import React, { useState } from 'react';
import './Productos.css';

const ProductList = ({
  products,
  setProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  };

  const onAddProduct = (product) => {
    const parsedPrice = parseFloat(product.price); 
    const newTotal = total + parsedPrice;

    setTotal(newTotal);
    setCountProducts(countProducts + 1); // Actualiza la cantidad de productos

    const existingProduct = products.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProducts = products.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...product, quantity: 1 }]);
    }
  };

  const filterProducts = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'todos' ?
    products :
    products.filter(product => product.category === selectedCategory);

  return (
    <div className="Fondo">
      <div className="category-buttons">
        <button onClick={() => filterProducts('todos')}>Todos</button>
        <button onClick={() => filterProducts('consolas')}>Consolas</button>
        <button onClick={() => filterProducts('videojuegos')}>Videojuegos</button>
        <button onClick={() => filterProducts('accesorios')}>Accesorios</button>
      </div>
      <div className="container-items">
        {filteredProducts.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img src={product.img} alt={product.nameProduct} />
            </figure>
            <div className="info-product">
              <h2>{product.nameProduct}</h2>
              <p className="price">{formatPrice(product.price)}</p>
              <button onClick={() => onAddProduct(product)}>Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
