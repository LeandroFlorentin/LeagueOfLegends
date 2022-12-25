const axios = require('axios')
const { Generos } = require('../models/Generos.js')
const { Peleadores } = require('../models/Peleadores.js')

const mostrarPersonajes = async () => {
    let personajes = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion.json')
    let arrayPersonajes = Object.keys(personajes.data.data).map(function (key) { return personajes.data.data[key] })
    let arrayConImagen = arrayPersonajes.map(ele => ({ ...ele, imagen: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ele.id}_0.jpg` }))
    Peleadores.bulkCreate(arrayConImagen)
}

const traerGeneros = async () => {
    let personajes = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion.json')
    let arrayPersonajes = Object.keys(personajes.data.data).map(function (key) { return personajes.data.data[key] })
    let tags = [...new Set(arrayPersonajes.map(ele => ele.tags).flat())].map(persona => ({ genero: persona }))
    Generos.bulkCreate(tags)
}

module.exports = {
    mostrarPersonajes,
    traerGeneros
}