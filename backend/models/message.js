const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User = require('./User');
const sequelize = new Sequelize('mysql::memory:')

const Message =  db.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //ajout d'une clé étrangère qui lie la colonne user_id à la colonne id de la table users
        references : {
            model: User,
            key: 'id'
        }
    },
    post: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    
    like: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    
})
module.exports = Message;