const { Router } = require('express');
const { mostrarGeneros } = require('../controllers/generos.js');
const routerGenero = Router();

routerGenero.get("/generos", mostrarGeneros)

module.exports = routerGenero;