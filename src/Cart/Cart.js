import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cartItems, updateCartItem, removeCartItem }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const allItemIds = cartItems.map(item => item.id);
    setSelectedItems(allItemIds);
  }, [cartItems]);

  const formatPrice = (price) => {
    return price.toLocaleString('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleToggleSelect = (itemId) => {
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleIncreaseQuantity = (item) => {
    updateCartItem({ ...item, quantity: item.quantity + 1 });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartItem({ ...item, quantity: item.quantity - 1 });
    } else {
      removeCartItem(item.id);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeCartItem(itemId);
  };

  const handleBuy = () => {
    console.log("Productos seleccionados para comprar:", selectedItems);
    console.log("Total a pagar:", formatPrice(calculateTotal(cartItems)));
  };

  return (
    <div className="cart-container"> 
      <div className="cart-products">
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleToggleSelect(item.id)}
                />
                <img src={item.img} alt={item.nameProduct} />
                <span>{item.nameProduct}</span>
              </div>
              <div>
                <span>Precio: ${formatPrice(item.price)}</span>
                <div className="quantity-control">
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <input type="text" readOnly value={item.quantity} />
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <p>Seleccione los productos que desea comprar</p>
        <h1>Carrito de compras</h1>
        <h3>Total: ${formatPrice(calculateTotal(cartItems))}</h3>
        <button onClick={handleBuy}>Comprar</button>
      </div>
    </div>
  );
};

export default Cart;
