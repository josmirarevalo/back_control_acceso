const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Usuario extends Model {}
  Usuario.init({
    // Atributos
    id: {
      type: Sequelize.SMALLINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,     
      allowNull: true   
    },
    username: {
      type: Sequelize.STRING,     
      allowNull: false   
    },
    password: {
      type: Sequelize.STRING,     
      allowNull: false   
    }, 
    active: {
      type: Sequelize.BOOLEAN,     
      allowNull: false   
    }, 

  },
{
  sequelize,
  modelName: 'usuario',
  timestamps: false,
  freezeTableName: true,
  underscored: true
});

module.exports = Usuario;