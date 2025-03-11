# Sistema de Gestión de Clientes

## Objetivo
Vamos a crear una API para gestionar clientes, donde cada cliente tendrá una cuenta corriente y una lista de productos con precios que podrán sumarse a su cuenta corriente. Esto implica que necesitaremos varios endpoints y una base de datos para almacenar la información.

## Paso 1: Estructura de la Base de Datos
Para comenzar, necesitamos definir cómo vamos a estructurar los datos. En este caso, se me ocurre que deberíamos tener las siguientes entidades:

### Modelo de Cliente
Contendrá información básica del cliente (nombre, email, etc.) y el balance de su cuenta corriente.

- **id** (único)
- **nombre** (string)
- **email** (string)
- **saldo** (float)

### Modelo de Producto
Detalles sobre los productos (nombre, precio).

- **id** (único)
- **nombre** (string)
- **precio** (float)

### Modelo de Transacción
Para registrar el historial de las compras o cargos a la cuenta corriente del cliente.

- **id** (único)
- **clienteId** (referencia a cliente)
- **productoId** (referencia a producto)
- **monto** (float)
- **fecha** (fecha)

## Paso 2: Endpoints de la API

### 1. **Clientes**
- **GET /clientes**: Obtiene todos los clientes.
- **GET /clientes/:id**: Obtiene la información de un cliente específico.
- **POST /clientes**: Crea un nuevo cliente.
- **PUT /clientes/:id**: Actualiza la información de un cliente (por ejemplo, el saldo).
- **DELETE /clientes/:id**: Elimina a un cliente.

### 2. **Productos**
- **GET /productos**: Obtiene todos los productos disponibles.
- **GET /productos/:id**: Obtiene un producto específico.
- **POST /productos**: Crea un nuevo producto.
- **PUT /productos/:id**: Actualiza los detalles de un producto (por ejemplo, el precio).
- **DELETE /productos/:id**: Elimina un producto.

### 3. **Transacciones**
- **POST /transacciones**: Registra una transacción (cuando un cliente compra un producto y el precio se agrega a su cuenta corriente).
- **GET /transacciones/:clienteId**: Obtiene todas las transacciones de un cliente.

## Paso 3: Tecnologías a Usar

- **Node.js con Express.js**: Para construir la API.
- **Base de datos**:
  - **MongoDB** (si prefieres una base de datos NoSQL).
  - **PostgreSQL o SQLite** (si prefieres una base de datos relacional). Para este tipo de aplicación, te recomiendo una base de datos relacional, ya que las relaciones entre clientes, productos y transacciones tienen sentido en este tipo de modelo.
- **ORM (Object Relational Mapping)**:
  - Si usas PostgreSQL o SQLite, puedes usar **Sequelize** o **TypeORM** para manejar las relaciones entre las tablas (clientes, productos, transacciones).

## Paso 4: Implementación Básica del Backend

### Inicializar el Proyecto y las Dependencias
```bash
mkdir sistema-gestion-clientes
cd sistema-gestion-clientes
npm init -y
npm install express sequelize pg body-parser
Crear las Entidades y Relaciones
Define los modelos en Sequelize o TypeORM (dependiendo de la base de datos que elijas). Aquí te dejo un ejemplo con Sequelize para un modelo básico de Cliente.

javascript
Copiar
Editar
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // O usa tu base de datos PostgreSQL

const Cliente = sequelize.define('Cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  saldo: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

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

const Transaccion = sequelize.define('Transaccion', {
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Cliente.hasMany(Transaccion);
Producto.hasMany(Transaccion);
Transaccion.belongsTo(Cliente);
Transaccion.belongsTo(Producto);

// Sincronizar la base de datos
sequelize.sync();
Crear los Endpoints de la API
Aquí te dejo un ejemplo de cómo podrías crear los endpoints básicos para clientes:

javascript
Copiar
Editar
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Crear un cliente
app.post('/clientes', async (req, res) => {
  const { nombre, email } = req.body;
  const cliente = await Cliente.create({ nombre, email });
  res.json(cliente);
});

// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

// Obtener un cliente por ID
app.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
});

// Actualizar un cliente
app.put('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    cliente.saldo += req.body.monto; // Agregar el monto a su saldo
    await cliente.save();
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('API en funcionamiento en el puerto 3000');
});
Paso 5: Pruebas de la API
Una vez que la API esté en funcionamiento, puedes utilizar herramientas como Postman o Insomnia para probar cada endpoint. Además, puedes escribir pruebas unitarias y funcionales con Jest y Supertest.