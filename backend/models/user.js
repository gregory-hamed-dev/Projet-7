const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database')
const sequelize = new Sequelize('mysql::memory:')

const User =  db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    profil_picture :{
        type: DataTypes.STRING,
        allowNull: true,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }},

)
module.exports = User;