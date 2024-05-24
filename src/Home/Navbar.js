import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/Navbar.css';
import cesta from '../img/cestados.png';

const NavigationBar = ({ countProducts, isAdmin, logout }) => {
  return (
    <header id="header" className="header">
      <h1 className="title">Electro Start</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/signup" className="nav-link">Ingresar</Link>
        {isAdmin && (
          <Link to="/admin" className="nav-link">Stock</Link>
        )}
        <div className="cart-container">
          <Link to="/shopping" className="cart-link">
            <img id="carrito" className="carrito" src={cesta} alt="Carrito" />
            {countProducts > 0 && <div id="numero" className="cart-count">{countProducts}</div>}
          </Link>
        </div>
        {isAdmin && (
          <button onClick={logout} className="logout-button">Cerrar sesión</button>
        )}
      </nav>
    </header>
  );
};

export default NavigationBar;
