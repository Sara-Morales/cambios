// AdminPanel.js

import React, { useState } from 'react';
import './AdminPanel.css';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import data from '../HomeProductos/data'; // Importar los datos de productos

const AdminPanel = () => {
  const [products, setProducts] = useState(data);
  const [editedProduct, setEditedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    nameProduct: '',
    price: '',
    img: '',
    category: '',
    status: '',
    stock: ''
  });

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  const handleSave = () => {
    setProducts(products.map((p) => (p.id === editedProduct.id ? editedProduct : p)));
    setEditedProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.nameProduct || !newProduct.price || !newProduct.img || !newProduct.category || !newProduct.status || !newProduct.stock) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: '', nameProduct: '', price: '', img: '', category: '', status: '', stock: '' });
  };

  return (
    <div className="admin-panel">
      <h2 className="panel-title">Panel de Administración</h2>
      <button className="add-new-btn" onClick={() => setEditedProduct(newProduct)}>Nuevo Producto</button>
      <div className="product-list">
        <div className="product-row header-row">
          <div>Código</div>
          <div>Imagen</div>
          <div>Nombre Producto</div>
          <div>Categoría</div>
          <div>Estado</div>
          <div>Precio</div>
          <div>Unidades</div>
          <div>Acciones</div>
        </div>
        {products.map((product) => (
          <div key={product.id} className="product-row">
            <div>{product.id}</div>
            <div><img src={product.img} alt={product.nameProduct} className="product-img" /></div>
            <div>{product.nameProduct}</div>
            <div>{product.category}</div>
            <div>{product.status}</div>
            <div>${product.price}</div>
            <div>{product.stock}</div>
            <div className="actions">
              <button className="action-btn" onClick={() => handleEdit(product)}><FaEdit /></button>
              <button className="action-btn" onClick={() => handleDelete(product.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      {editedProduct && (
        <div className="edit-product-form">
          <h3>Editar Producto</h3>
          <input type="text" name="nameProduct" value={editedProduct.nameProduct} onChange={handleNewProductChange} placeholder="Nombre del producto" />
          <input type="text" name="category" value={editedProduct.category} onChange={handleNewProductChange} placeholder="Categoría" />
          <input type="text" name="status" value={editedProduct.status} onChange={handleNewProductChange} placeholder="Estado" />
          <input type="number" name="price" value={editedProduct.price} onChange={handleNewProductChange} placeholder="Precio" />
          <input type="number" name="stock" value={editedProduct.stock} onChange={handleNewProductChange} placeholder="Unidades de stock" />
          <button onClick={handleSave} className="save-btn">Guardar</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
