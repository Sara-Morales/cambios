import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [housingType, setHousingType] = useState('casa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressError(false); // Reiniciar el mensaje de error cuando se cambia la dirección
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setCityError(false); // Reiniciar el mensaje de error cuando se cambia la ciudad
  };

  const handleHousingTypeChange = (e) => {
    setHousingType(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo permite números
    setPhoneNumber(value);
    setPhoneError(false); // Reiniciar el mensaje de error cuando se cambia el número de teléfono
  };

  const handleConfirmPurchase = () => {
    if (!address) {
      setAddressError(true); // Mostrar mensaje de error si la dirección está vacía
    }
    if (!city) {
      setCityError(true); // Mostrar mensaje de error si la ciudad está vacía
    }
    if (!phoneNumber) {
      setPhoneError(true); // Mostrar mensaje de error si el número de teléfono está vacío
    }

    // Si algún campo está vacío, no continuar
    if (!address || !city || !phoneNumber) {
      return;
    }

    // Aquí puedes añadir la lógica para confirmar la compra y enviar los datos
    console.log("Dirección de envío:", address);
    console.log("Ciudad:", city);
    console.log("Tipo de vivienda:", housingType);
    console.log("Teléfono:", phoneNumber);
    console.log("Productos a comprar:", cartItems);
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <h1>Resumen de compra</h1>
      <div className="address-city-section">
        <div className="address-section">
          <label htmlFor="address">Dirección de envío:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Ingrese su dirección"
            required
            className={addressError ? 'error' : ''}
          />
          {addressError && <p className="error-message">Por favor ingrese su dirección</p>}
        </div>
        <div className="city-section">
          <label htmlFor="city">Ciudad:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Ingrese su ciudad"
            required
            className={cityError ? 'error' : ''}
          />
          {cityError && <p className="error-message">Por favor ingrese su ciudad</p>}
        </div>
      </div>
      <div className="housing-phone-section">
        <div className="housing-type-section">
          <label htmlFor="housing-type">Tipo de vivienda:</label>
          <select
            id="housing-type"
            value={housingType}
            onChange={handleHousingTypeChange}
            required
          >
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="local">Local</option>
          </select>
        </div>
        <div className="phone-section">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel" // Cambiado a tipo "tel" para permitir solo números
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Ingrese su número de teléfono"
            pattern="[0-9]{10}" // Patrón para aceptar solo 10 dígitos numéricos
            required
            className={phoneError ? 'error' : ''}
          />
          {phoneError && <p className="error-message">Por favor ingrese su número de teléfono</p>}
        </div>
      </div>
      <div className="summary-section">
        <h2>Productos seleccionados</h2>
        <div className="summary-header">
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Precio</span>
        </div>
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span className="summary-item-product">{item.nameProduct}</span>
              <span className="summary-item-quantity">{item.quantity}</span>
              <span className="summary-item-price">${formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
        <h3 className="total-payment">Total: ${formatPrice(calculateTotal(cartItems))}</h3>
      </div>
      <button onClick={handleConfirmPurchase}>Confirmar compra</button>
    </div>
  );
};

export default Checkout;
