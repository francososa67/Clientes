const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./cliente');

// Definir el modelo de Transacción
const Transaccion = sequelize.define('Transaccion', {
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  montoPagado: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  estadoPago: {
    type: DataTypes.ENUM('pendiente', 'completo'),
    defaultValue: 'pendiente',
  },
});

// Relación entre Transacción y Cliente
Transaccion.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Transaccion;
