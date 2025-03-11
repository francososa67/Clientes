const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo de Producto
const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Producto;
