const express = require('express');
const cors = require("cors");

const UsuarioImagenesController = require('../controllers/usuarioimagenes.controller');

const { verificaToken } = require('../middlewares/authentication');

let app = express();

// ===============================================================
//  Rutas para Imágenes por Usuario
// ===============================================================

app.get(process.env.API_URL     + '/usuarioimageneslist/:id_usuario', cors(), UsuarioImagenesController.getList);
app.get(process.env.API_URL     + '/usuarioimagenes/:id',             cors(), UsuarioImagenesController.getOne);
app.post(process.env.API_URL    + '/usuarioimagenes',                 cors(), UsuarioImagenesController.create);
app.put(process.env.API_URL     + '/usuarioimagenes/:id',             cors(), UsuarioImagenesController.update); 
app.delete(process.env.API_URL  + '/usuarioimagenes/:id',             cors(), UsuarioImagenesController.delete); 

module.exports = app;