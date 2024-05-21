import React from 'react';
import './Cart.css';

const Cart = ({ cartItems }) => {
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img src={item.img} alt={item.nameProduct} className="cart-item-img" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.nameProduct}</span>
                <span className="cart-item-price">Precio: ${item.price}</span>
                <span className="cart-item-quantity">Cantidad: {item.quantity}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal(cartItems)}</h3>
    </div>
  );
};

export default Cart;
