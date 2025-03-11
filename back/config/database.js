// config/database.js
const { Sequelize } = require('sequelize');

// Crear la conexión a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Nombre del archivo de la base de datos
});

module.exports = sequelize;
