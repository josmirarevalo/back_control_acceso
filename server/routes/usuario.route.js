const express = require('express');
const cors = require("cors");

const UsuarioController = require('../controllers/usuario.controller');

//const User = require('../models/user.model');

//const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');

let app = express();

// ===========================
//  Rutas para Usuario
// ===========================

app.get(process.env.API_URL     + '/usuario',           cors(), UsuarioController.getList);
app.get(process.env.API_URL     + '/usuario/:username', cors(), UsuarioController.getOne);
app.post(process.env.API_URL    + '/usuario',           cors(), UsuarioController.create);
app.put(process.env.API_URL     + '/usuario/:id',       cors(), UsuarioController.update); 
app.delete(process.env.API_URL  + '/usuario/:id',    cors(), UsuarioController.delete); 

module.exports = app;