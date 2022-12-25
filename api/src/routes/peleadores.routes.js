const { Router } = require('express')
const { mostrarPeleadores, mostrarPersonaje } = require('../controllers/peleadores.js')
const routerPelea = Router()

routerPelea.get('/peleadores', mostrarPeleadores)
routerPelea.get('/peleadores/:name', mostrarPersonaje)

module.exports = routerPelea;