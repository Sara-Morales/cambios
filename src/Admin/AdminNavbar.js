import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Stock</div>
      <div className="navbar-options">
        <div className="admin-info">Admin</div>
        <Link to="/" className="logout-button">Cerrar sesión</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
