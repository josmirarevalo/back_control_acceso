
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Usuario = require('../models/usuario.model');

const Model = Sequelize.Model;

class UsuarioImagenes extends Model {}
 UsuarioImagenes.init({
  id: {
      type: Sequelize.SMALLINT, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
  },
  id_usuario: {
    type: Sequelize.SMALLINT, 
    allowNull: false
  },
  imagen_usuario: {
    type: Sequelize.BLOB,
    allowNull: true
  }
}, 
{
  sequelize,
  modelName: 'usuario_imagenes',
  timestamps: false,
  freezeTableName: true,
  underscored: true
});

UsuarioImagenes.belongsTo(Usuario, {as: 'usuario', foreignKey: 'id_usuario'});

module.exports = UsuarioImagenes;