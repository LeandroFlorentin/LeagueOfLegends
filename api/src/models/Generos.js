const { conexion } = require('../db.js')
const { DataTypes } = require('sequelize')

module.exports = {
    Generos: conexion.define('Generos', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        genero: DataTypes.STRING
    }, {
        timestamps: false
    })
}