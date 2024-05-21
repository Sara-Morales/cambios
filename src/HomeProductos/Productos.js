import React from 'react';
import data from './data';
import './Productos.css';

const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const onAddProduct = (product) => {
    const parsedPrice = product.price; // Asume que el precio ya es un número
    const newTotal = total + parsedPrice;

    setTotal(newTotal);
    setCountProducts(countProducts + 1);

    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="Fondo">
      <div className="container-items">
        {data.map((product) => (
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
