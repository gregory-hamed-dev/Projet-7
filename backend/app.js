const express = require("express");
const app = express();
const user =  require("./models/user");
const db = require('./config/database');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message');

app.use(bodyParser.json());

// Paramétrages des en-têtes de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 // test de connexion à la db
db.authenticate()
.then(()=>{
    console.log('connexion à mysql réussie')
})
.catch((err)=>{
    console.error('impossible de se connecter à mysql', err)
})   

app.get('/', (req, res) => {
       res.send(`salut les gens !`)
})
app.use('/groupoma/social-network/auth', userRoutes)
app.use('/groupoma/social-network/message', messageRoutes)

module.exports = app;