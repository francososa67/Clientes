const express = require('express');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes');
const cors = require('cors');

// Crea la instancia de la aplicación Express
const app = express();

// Usa cors en tu aplicación Express
app.use(cors());

app.use(express.json());

// Definir las rutas
app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/transacciones', transaccionRoutes);

// Importar las asociaciones después de cargar los modelos
require('./models/associations');  // Corrección en la importación

// Sincronizamos la base de datos
sequelize.sync({ force: true })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.log('Error al sincronizar la base de datos:', err));

// Iniciamos el servidor
app.listen(4000, () => {
  console.log('API en funcionamiento en el puerto 4000');
});
