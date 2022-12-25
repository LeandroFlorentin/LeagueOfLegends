require('dotenv').config()
const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD
} = process.env
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/lol`, {
    logging: false
})

module.exports = {
    ...sequelize.models,
    conexion: sequelize
}