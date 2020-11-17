const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Com = db.define('commentaires', {
    idCom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    commentaires: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
})

module.exports = Com