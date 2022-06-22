const express = require('express');
const app = express();

// Rutas
app.use(require('./usuario.route'));
app.use(require('./login.route'));
app.use(require('./usuarioimagenes.route'));
//app.use(require('./login.route'));

module.exports = app;