const Transaccion = require('../models/transaccion'); // Modelo de Transacción
const Cliente = require('../models/cliente'); // Modelo de Cliente
const Producto = require('../models/producto'); // Modelo de Producto

// Crear una nueva transacción
exports.createTransaccion = async (req, res) => {
  const { clienteId, productoId, monto } = req.body;
  try {
    const cliente = await Cliente.findByPk(clienteId);
    const producto = await Producto.findByPk(productoId);

    if (!cliente || !producto) {
      return res.status(404).json({ error: 'Cliente o producto no encontrado' });
    }

    const transaccion = await Transaccion.create({
      monto,
      ClienteId: clienteId,
      ProductoId: productoId,
    });

    // Actualizar saldo del cliente
    cliente.saldo += monto;
    await cliente.save();

    res.status(201).json(transaccion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

// Obtener todas las transacciones
exports.getAllTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

// Obtener una transacción por ID
exports.getTransaccionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaccion = await Transaccion.findByPk(id);
    if (transaccion) {
      res.json(transaccion);
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la transacción' });
  }
};
