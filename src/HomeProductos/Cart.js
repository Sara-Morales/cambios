import React from 'react';
import './Cart.css';

const Cart = ({ cartItems }) => {
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <img src={item.img} alt={item.nameProduct} />
              <span>{item.nameProduct}</span>
            </div>
            <div>
              <span>Precio: ${item.price}</span>
              <span>Cantidad: {item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal(cartItems)}</h3>
    </div>
  );
};

export default Cart;
