const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/message');
const comRoutes =  require('./routes/com')
const path = require('path')



// Paramétrages des en-têtes de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.disable("x-powered-by")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', userRoutes)
app.use('/message', messageRoutes)
app.use('/commentaire', comRoutes)



module.exports = app;