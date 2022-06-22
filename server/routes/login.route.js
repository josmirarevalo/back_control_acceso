const express = require('express');

const cors = require("cors");

const UsuarioController = require('../controllers/usuario.controller');

const { verificaToken} = require('../middlewares/authentication');

let app = express();

// ===========================
//  Rutas para Login
// ===========================

app.post(process.env.API_URL + '/login/validarusuario', cors(),  UsuarioController.validarUsuario);
app.post(process.env.API_URL + '/login/generarpassword', cors(), UsuarioController.generarPassword);

//app.get(process.env.API_URL + '/login/csrftoken', cors(), UserController.csrftoken);

module.exports = app;