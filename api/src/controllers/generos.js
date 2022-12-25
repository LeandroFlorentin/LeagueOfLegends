const {
    traerGeneros
} = require('../helper/personajes.js')
const { Generos } = require('../models/Generos.js')

const mostrarGeneros = async (req, res) => {
    try {
        const generos = await Generos.findAll()
        res.status(200).json(generos)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = {
    mostrarGeneros
}