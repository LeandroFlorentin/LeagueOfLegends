const { Router } = require('express')
const router = Router()
const peleadores = require('./peleadores.routes.js')
const generos = require('./generos.routes.js')

router.use('/', peleadores)
router.use('/', generos)

module.exports = router