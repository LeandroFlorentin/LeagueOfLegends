const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')

const servidor = express()

servidor.use(morgan('dev'))
servidor.use(cors())
servidor.use('/', routes)

module.exports = servidor