// Configuración de Conexión a la Base de Datos usando ORM Sequelize

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.URLDB);

module.exports = sequelize;

