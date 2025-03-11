import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transaccion = () => {
  const [clientes, setClientes] = useState([]);
  const [detalleCompra, setDetalleCompra] = useState(null); // Para almacenar el detalle de la compra
  const [montoPago, setMontoPago] = useState(''); // Para capturar el monto a pagar

  useEffect(() => {
    axios.get('http://localhost:4000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error("Error fetching clientes", error);
      });
  }, []);

  // Función para manejar la compra
  const handleCompra = (idCliente) => {
    // Lógica para realizar la compra
    console.log(`Cliente con ID ${idCliente} realiza una compra`);
    // Aquí puedes agregar la lógica de productos y cantidades seleccionadas
  };

  // Función para mostrar el detalle de la compra
  const handleDetalle = (idCliente) => {
    // Lógica para obtener el detalle de la compra del cliente
    const clienteSeleccionado = clientes.find(cliente => cliente.id === idCliente);
    if (clienteSeleccionado) {
      const detalles = [
        { producto: 'Producto 1', cantidad: 2, precio: 50 },
        { producto: 'Producto 2', cantidad: 1, precio: 100 },
      ];
      setDetalleCompra({ cliente: clienteSeleccionado, detalles });
    }
  };

  // Función para realizar el pago de la transacción
  const pagarTransaccion = async (transaccionId, montoPago) => {
    try {
      const response = await axios.post('http://localhost:4000/transacciones/pagar', {
        transaccionId,
        montoPago,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error al realizar el pago", error);
      alert("Error al realizar el pago");
    }
  };

  // Manejo de pago, asegurándonos de que el monto sea válido
  const handlePago = (idTransaccion) => {
    if (montoPago > 0) {
      pagarTransaccion(idTransaccion, montoPago);
    } else {
      alert('Por favor ingrese un monto válido');
    }
  };

  return (
    <div>
      <h1>Transacciones</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre Cliente</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.saldo ? cliente.saldo.toFixed(2) : "0.00"}</td>
              <td>
                <button onClick={() => handleCompra(cliente.id)}>Realizar Compra</button>
                <button onClick={() => handleDetalle(cliente.id)}>Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar el detalle de la compra si existe */}
      {detalleCompra && (
        <div>
          <h2>Detalle de Compra - {detalleCompra.cliente.nombre}</h2>
          <ul>
            {detalleCompra.detalles.map((item, index) => (
              <li key={index}>
                {item.producto} - Cantidad: {item.cantidad} - Precio Total: ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <h3>Total de la compra: ${detalleCompra.detalles.reduce((total, item) => total + item.precio * item.cantidad, 0)}</h3>
          
          {/* Formulario para realizar el pago */}
          <div>
            <input 
              type="number" 
              value={montoPago}
              onChange={(e) => setMontoPago(e.target.value)}
              placeholder="Monto a pagar"
            />
            <button onClick={() => handlePago(detalleCompra.cliente.id)}>Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaccion;
