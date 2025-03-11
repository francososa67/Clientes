const express = require('express');
const transaccionController = require('../controllers/transaccionController'); // Importar el controlador de transacciones

const router = express.Router();

// Definir las rutas para transacciones
router.post('/', transaccionController.createTransaccion); // Crear transacción
router.get('/', transaccionController.getAllTransacciones); // Obtener todas las transacciones
router.get('/:id', transaccionController.getTransaccionById); // Obtener transacción por ID

module.exports = router;
