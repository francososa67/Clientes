const Producto = require('../models/producto'); // Modelo de Producto

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const producto = await Producto.create({ nombre, precio });
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
};

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      producto.nombre = nombre;
      producto.precio = precio;
      await producto.save();
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.destroy();
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
