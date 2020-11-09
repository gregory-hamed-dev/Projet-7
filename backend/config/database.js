const Sequelize = require('sequelize');
const mysql = require('mysql2');
  
// connexion database

module.exports = new Sequelize('groupoma_social_network', 'root', 'maiakovski86', {
    host : 'localhost',
    dialect: 'mysql',
})