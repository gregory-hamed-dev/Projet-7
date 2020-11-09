const Sequilize = require('sequelize');
const db = require('../config/database')

const user = db.define('user', {
    id: {
      type: Sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
        type: Sequilize.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequilize.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequilize.STRING(20),
        allowNull: false,
    },
    description: {
        type: Sequilize.TEXT,
        allowNull: true
    },
    isAdmin: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }   
})
console.log(user.id)
 module.exports = user;