import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import '../Admin/AdminPanel.css';

const AdminPanel = ({ products, setProducts }) => {
  const [editedProduct, setEditedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    nameProduct: "",
    price: "",
    img: "",
    category: "",
    stock: "",
  });

  const [idCounter, setIdCounter] = useState(1);

  const handleEdit = (product) => {
    setEditedProduct({ ...product });
  };

  const handleSave = () => {
    if (validateProduct(editedProduct)) {
      setProducts(
        products.map((p) => (p.id === editedProduct.id ? editedProduct : p))
      );
      setEditedProduct(null);
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    if (validateProduct(newProduct)) {
      const newId = idCounter;
      const updatedProducts = [...products, { ...newProduct, id: newId }];
      setProducts(updatedProducts);
      setIdCounter(idCounter + 1);
      setShowAddForm(false);
      setNewProduct({
        id: "",
        nameProduct: "",
        price: "",
        img: "",
        category: "",
        stock: "",
      });
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };

  const handleProductChange = (e, key) => {
    const { value } = e.target;
    setEditedProduct({ ...editedProduct, [key]: value });
  };

  const handleNewProductChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, img: reader.result });
      };
      if (files[0]) { 
        reader.readAsDataURL(files[0]);
      }
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };
  

  const validateProduct = (product) => {
    const { nameProduct, price, category, stock } = product;
    return (
      nameProduct.trim() !== "" &&
      category.trim() !== "" &&
      price !== "" &&
      !isNaN(price) &&
      stock !== "" &&
      !isNaN(stock)
    );
  };

  return (
    <div className="admin-panel">
      <h2 className="panel-title">Panel de Administración</h2>
      <button className="add-new-btn" onClick={() => setShowAddForm(true)}>
        Agregar Producto
      </button>
      {showAddForm && (
        <div className="add-product-form">
          <input
            type="text"
            name="nameProduct"
            value={newProduct.nameProduct}
            onChange={handleNewProductChange}
            placeholder="Nombre del producto"
            className="dark-input"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleNewProductChange}
            placeholder="Categoría"
            className="dark-input"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            placeholder="Precio"
            className="dark-input"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleNewProductChange}
            placeholder="Unidades de stock"
            className="dark-input"
          />
          <input
            type="file"
            name="img"
            onChange={handleNewProductChange}
            className="dark-input"
          />
          <div className="add-buttons-container">
            <button onClick={handleAddProduct} className="add-product-button">
              Añadir
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="cancel-add-button"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div className="product-list">
        <div className="items">
          <div>ID</div>
          <div>Imagen</div>
          <div>Nombre Producto</div>
          <div>Categoría</div>
          <div>Precio</div>
          <div>Unidades</div>
          <div>Acciones</div>
        </div>
        {products.map((product, index) => (
          <div key={product.id || index} className="product-row">
            <div>{product.id}</div>
            <div>
              <img
                src={product.img}
                alt={product.nameProduct}
                className="product-img"
              />
            </div>
            <div>
              {editedProduct && editedProduct.id === product.id ? (
                <input
                  type="text"
                  value={editedProduct.nameProduct}
                  onChange={(e) => handleProductChange(e, "nameProduct")}
                  className="dark-input"
                />
              ) : (
                product.nameProduct
              )}
            </div>
            <div>
              {editedProduct && editedProduct.id === product.id ? (
                <input
                  type="text"
                  value={editedProduct.category}
                  onChange={(e) => handleProductChange(e, "category")}
                  className ="dark-input"
                  />
                ) : (
                  product.category
                )}
              </div>
              <div>
                {editedProduct && editedProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => handleProductChange(e, "price")}
                    className="dark-input"
                  />
                ) : (
                  `$${product.price}`
                )}
              </div>
              <div>
                {editedProduct && editedProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) =>
                      handleProductChange(e, "stock")}
                    className="dark-input"
                  />
                ) : (
                  product.stock
                )}
              </div>
              <div className="actions">
                {editedProduct && editedProduct.id === product.id ? (
                  <button className="action-btn" onClick={handleSave}>
                    Guardar
                  </button>
                ) : (
                  <>
                    <button
                      className="action-btn"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AdminPanel;
  
