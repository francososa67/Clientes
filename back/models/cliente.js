// models/cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaccion = require('./transaccion');

// Definir el modelo de Cliente
const Cliente = sequelize.define('Cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El nombre debe ser único
  },
  saldo: {
    type: DataTypes.FLOAT,
    defaultValue: 0, // El saldo inicial es 0
  },
});

// Relación entre Cliente y Transacción
Cliente.hasMany(Transaccion, { foreignKey: 'clienteId' });
Transaccion.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Cliente;
