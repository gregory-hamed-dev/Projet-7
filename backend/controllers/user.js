const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs =  require('fs');




//création d'un utilisateur
exports.signUp = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            User.create({
                nom_utilisateur: req.body.nom_utilisateur,
                email: req.body.email,
                password: hash, 
            })//.then((data) => res.status(201).json({ message: 'Utilisateur crée !'}))
            .then(newUser => res.send(newUser.id))
            .catch(error => res.status(400).json({error, message: 'les données renseignées ne respectent pas les contraintes'}));
        })
        .catch(error => res.status(500).json({error, message : 'impossible d\'inscrire l\'utilisateur '})); 
}
//login d'un utilisateur
exports.login = (req, res, next) => {
        User.findOne({where : {email: req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(403).json({ error: 'L\'utilisateur n\'existe pas'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    if (!match) {
                        return res.status(401).json({ error: 'Mot de passe erroné  !'})
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id, Admin: user.admin},
                            '59UiBWftCNG2gqz9bBgy1rYQUkOx9Ewg1o8yEJp2AKIVaunSJt', 
                            {
                                expiresIn: '12h'
                            } 
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch((error) => res.status(403).json({error, message: ' L\'utilisateur doit créer un compte '}));
}

//accéder au profil de l'utilisateur
exports.getUserProfil = (req, res, next) => {
    User.findOne(
        {attributes: ['id', 'nom_utilisateur', 'description', 'email', 'profil_picture']},
        {where :{id: req.params.userId}}
    )
    .then(user => res.send(user)      
    )
    .catch(error => res.status(401).json({error}))
}

//modification des données utilisateur
exports.modifyUser = (req, res, next) => {
  const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    User.update(
        {   
            nom_utilisateur: req.body.nom_utilisateur,
            description: req.body.description,
            email: req.body.email,
            profil_picture: image
        },
        {where : {id: req.params.userId}}
    )
    .then(()=> res.status(201).json({message: 'Modification du profil réussi'})     
    )
    .catch(error => res.status(401).json({error, message: 'impossible de modifier les informations de profil'}))
}
/*async function editProfil() {
        await User.update(
            {   
                nom_utilisateur: req.body.nom_utilisateur,
                description: req.body.description,
                email: req.body.email,
            },
            {where : {id: req.params.userId}}
        )
    }
    editProfil()*/
//suppression du compte utilisateur
exports.deleteUser = (req, res, next) => {  
    const fileName = user.profil_picture.split('/images/')[1];
        fs.unlink(`images/${fileName}`, () => {
    User.destroy({where: { id : req.params.userId}})})
    .then(() => res.status(201).json({message: "Utilisateur effacé avec succès"}))
    .catch(error => res.status(401).json(error) ) 
}