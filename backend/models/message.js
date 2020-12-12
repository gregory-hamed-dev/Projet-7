const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Com = require('./com');


const Message =  db.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    title : {
        type: DataTypes.STRING(45),
        allowNull: true,
    },

    post: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
},
{
  
    // don't forget to enable timestamps!
    timestamps: true,
  
    // I don't want createdAt
    createdAt: false,
  
    // I want updatedAt to actually be called updateTimestamp
    createdAt: 'dateCreate',
    updatedAt: 'dateUpdate'
    
  }
    
)
Message.hasMany(Com)
Com.belongsTo(Message)

module.exports = Message;