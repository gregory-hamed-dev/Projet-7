const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Message = require('./Message');
const Com = require('./com');


const User =  db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_utilisateur: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            // expression régulière pour valider un type de données valide
            is: ["^[a-zA-Z0-9]*$"]
        }
    },
    description :{
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate : {
            // la donnée utilisteur doit correspondre au format d'un email
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
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
    },
    
})
//clef étrangère créee automatiquement qui lie la table users avec l'id et la table messages sur la colonne userId
User.hasMany(Message)
Message.belongsTo(User)
User.hasMany(Com)
Com.belongsTo(User)

module.exports = User;

