const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir la tabla intermedia ProductoTransaccion
const ProductoTransaccion = sequelize.define('ProductoTransaccion', {
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  precioTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = ProductoTransaccion;
