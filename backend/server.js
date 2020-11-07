const express = require("express");
const mysql = require("mysql");

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'maiakovski86',
    database: 'elevage'
})

connexion.connect((err) =>{
    if (err) throw err;
    else{
        console.log('Connexion à mysql réussie')
    }
});

connexion.query('SELECT * FROM client', (error, results, fields) =>{
    if (error) throw error;
    //for (result in results) {console.log(results[result].nom)}
    
   
})

connexion.end();