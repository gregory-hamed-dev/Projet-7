const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Com = require('./com');


const Message =  db.define('message', {
    idMessage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    like: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        allowNull: false
    }
    
})
Message.hasMany(Com)
Com.belongsTo(Message)

module.exports = Message;