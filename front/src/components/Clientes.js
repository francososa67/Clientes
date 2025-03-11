import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCliente, setNewCliente] = useState({ nombre: '' });
  const [editCliente, setEditCliente] = useState({ id: null, nombre: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/clientes')
      .then(response => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
        setError('Error al obtener los clientes');
        setLoading(false);
      });
  }, []);

  const handleAddCliente = () => {
    if (!newCliente.nombre.trim()) {
      setError('El nombre del cliente no puede estar vacío');
      return;
    }

    axios.post('http://localhost:4000/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setNewCliente({ nombre: '' });
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Error al agregar cliente:', error);
        setError('Error al agregar cliente');
      });
  };

  const handleDeleteCliente = (id) => {
    axios.delete(`http://localhost:4000/clientes/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar cliente:', error);
        setError('Error al eliminar cliente');
      });
  };

  const handleEditCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
      setEditCliente(cliente);
    } else {
      setError('No se encontró el cliente');
    }
  };

  const handleSaveCliente = () => {
    if (!editCliente.nombre.trim()) {
      setError('El nombre del cliente no puede estar vacío');
      return;
    }

    axios.put(`http://localhost:4000/clientes/${editCliente.id}`, { nombre: editCliente.nombre })
      .then(response => {
        setClientes(clientes.map(cliente => 
          cliente.id === editCliente.id ? response.data : cliente
        ));
        setEditCliente({ id: null, nombre: '' });
      })
      .catch(error => {
        console.error('Error al modificar cliente:', error);
        setError('Error al modificar cliente');
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {editCliente.id === cliente.id ? (
              <>
                <input
                  type="text"
                  value={editCliente.nombre}
                  onChange={(e) => setEditCliente({ ...editCliente, nombre: e.target.value })}
                />
                <button onClick={handleSaveCliente}>Guardar</button>
              </>
            ) : (
              <>
                {cliente.nombre}
                <button onClick={() => handleEditCliente(cliente.id)}>Editar</button>
                <button onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => setIsModalOpen(true)}>Agregar Nuevo Cliente</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Cliente</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newCliente.nombre}
              onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
            />
            <button onClick={handleAddCliente}>Agregar</button>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
