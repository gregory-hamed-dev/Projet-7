const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//création d'un utilisateur
exports.signUp = (req, res, next) => {
    
    bcrypt.hash('maikovski86', 10)
        .then( hash => {
            User.create({
                pseudo: 'mainAdmin',
                email: 'gregoryhamed@yahoo.fr',
                password: hash,
                profil_picture: '',
                admin: 1
            })//.then((data) => res.status(201).json({ message: 'Utilisateur crée !'}))
            .then(data => res.send(data))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error})); 
}
//login d'un utilisateur
exports.login = (req, res, next) => {
        User.findOne({where : {email: req.body.email}})
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
                            {
                                expiresIn: '12h'
                            } 
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
}

//déconnexion de l'utilisateur
exports.logout =(req, res, next) => {
    req.session.destroy()
    res.redirect('/login')
    }

//suppression du compte utilisateur
exports.deleteUser = (req, res, next) => {  
    User.destroy({
        where: { id : req.params.userId}
    })
    .then(() => res.status(201).json({message: "Utilisateur effacé avec succès"}))
    .catch(error => res.status(401).json(error) ) 
}