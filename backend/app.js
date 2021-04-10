const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/message');
const comRoutes =  require('./routes/com')
const path = require('path')
const cookieSession = require('cookie-session')
const helmet = require('helmet')


// Paramétrages des en-têtes de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', 'script-src http://localhost:8080')
    next();
  });
  


//paramètres des cookies pour le http only pour éviter la modification par un tiers
app.use(cookieSession({
  secret: 's3Cur3',
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://127.0.0.1:3000'
  }
})
);
//couche de sécurité pour éviter les attaques courantes
app.use(helmet.xssFilter())
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "sameorigin" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', userRoutes)
app.use('/message', messageRoutes)
app.use('/commentaire', comRoutes)



module.exports = app;