const { conexion } = require('../db.js')
const { DataTypes } = require('sequelize')

module.exports = {
    Peleadores: conexion.define('Peleadores', {
        iden: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id: DataTypes.STRING,
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        blurb: DataTypes.TEXT,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        partype: DataTypes.STRING,
        imagen: DataTypes.TEXT
    }, {
        timestamps: false
    })
}