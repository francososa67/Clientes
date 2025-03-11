import React, { useState, useEffect } from "react";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProducto, setNewProducto] = useState({ nombre: "", precio: 0 });
  const [editProducto, setEditProducto] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/productos")
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al obtener los productos");
        setLoading(false);
      });
  }, []);

  // Agregar un nuevo producto
  const handleAddProducto = () => {
    axios
      .post("http://localhost:4000/productos", newProducto)
      .then((response) => {
        setProductos([...productos, response.data]);
        setNewProducto({ nombre: "", precio: 0 });
        setIsAdding(false);
      })
      .catch(() => setError("Error al agregar producto"));
  };

  // Eliminar un producto
  const handleDeleteProducto = (id) => {
    axios
      .delete(`http://localhost:4000/productos/${id}`)
      .then(() => {
        setProductos(productos.filter((producto) => producto.id !== id));
      })
      .catch(() => setError("Error al eliminar producto"));
  };

  // Preparar producto para edición
  const handleModifyProducto = (producto) => {
    setEditProducto(producto);
  };

  // Guardar modificaciones
  const handleSaveProducto = () => {
    axios
      .put(`http://localhost:4000/productos/${editProducto.id}`, editProducto)
      .then((response) => {
        setProductos(
          productos.map((producto) =>
            producto.id === editProducto.id ? response.data : producto
          )
        );
        setEditProducto(null);
      })
      .catch(() => setError("Error al modificar producto"));
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => handleDeleteProducto(producto.id)}>Eliminar</button>
            <button onClick={() => handleModifyProducto(producto)}>Modificar</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setIsAdding(true)}>Agregar Nuevo Producto</button>

      {/* Modal para agregar producto */}
      {isAdding && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Producto</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newProducto.nombre}
              onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              value={newProducto.precio}
              onChange={(e) => setNewProducto({ ...newProducto, precio: parseFloat(e.target.value) })}
            />
            <button onClick={handleAddProducto}>Agregar</button>
            <button onClick={() => setIsAdding(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para editar producto */}
      {editProducto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <input
              type="text"
              value={editProducto.nombre}
              onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
            />
            <input
              type="number"
              value={editProducto.precio}
              onChange={(e) => setEditProducto({ ...editProducto, precio: parseFloat(e.target.value) })}
            />
            <button onClick={handleSaveProducto}>Guardar</button>
            <button onClick={() => setEditProducto(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
