const Producto = require('./producto');
const Transaccion = require('./transaccion');
const ProductoTransaccion = require('./productoTransaccion');

// Relación muchos a muchos entre Producto y Transacción
Producto.belongsToMany(Transaccion, { through: ProductoTransaccion, foreignKey: 'productoId' });
Transaccion.belongsToMany(Producto, { through: ProductoTransaccion, foreignKey: 'transaccionId' });
