const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Com = db.define('commentaires', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    commentaires: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
},
{
  
    // don't forget to enable timestamps!
    timestamps: true,
  
 
  
    // I want updatedAt to actually be called updateTimestamp
    createdAt: 'dateCreateCom',
    updatedAt: 'dateUpdateCom'
    
  }
)

module.exports = Com