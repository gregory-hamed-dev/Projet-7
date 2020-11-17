const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/message');



// Paramétrages des en-têtes de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  

app.use(bodyParser.json());
app.use('/auth', userRoutes)
app.use('/message', messageRoutes)


module.exports = app;