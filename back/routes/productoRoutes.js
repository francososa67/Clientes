const express = require('express');
const productoController = require('../controllers/productoController'); // Importar el controlador de productos

const router = express.Router();

// Definir las rutas para productos
router.post('/', productoController.createProducto); // Crear producto
router.get('/', productoController.getAllProductos); // Obtener todos los productos
router.get('/:id', productoController.getProductoById); // Obtener producto por ID
router.put('/:id', productoController.updateProducto); // Actualizar producto
router.delete('/:id', productoController.deleteProducto); // Eliminar producto

module.exports = router;
