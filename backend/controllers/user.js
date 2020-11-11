const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//création d'un utilisateur
exports.signUp = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            User.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
            }).then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
              .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error})); 
}
//login d'un utilisateur
exports.login = (req, res, next) => {
        User.findByPk(req.param.id)
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Accès non autorisée !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (!match) {
                        return res.status(401).json({ error: 'Mot de passe erroné  !'})
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            '59UiBWftCNG2gqz9bBgy1rYQUkOx9Ewg1o8yEJp2AKIVaunSJt',      
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(() => res.status(500).json({message: 'c\'est caca boudin'}));
}
exports.logout =(req, res, next) => {
    req.user.deleteToken(req.token, (err, res) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
}
