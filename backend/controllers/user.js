const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs =  require('fs');
const Comm= require ('../models/Com');
const Message = require ('../models/Message')


//création d'un utilisateur
exports.signUp = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            User.create({
                nom_utilisateur: req.body.nom_utilisateur,
                email: req.body.email,
                password: hash, 
            }).then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
            
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
                        id: user.id,
                        token: jwt.sign(
                            { id: user.id, Admin: user.admin},
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

//accèder au profils de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ['id', 'nom_utilisateur', 'description', 'email', 'profil_picture'],
        order : [['createdAt', 'DESC']]
    })
    .then(response => res.send(response))
    .catch(error => res.status(401).json({error}))
}

//accéder au profil de l'utilisateur
exports.getUserProfil = (req, res, next) => {
    User.findOne(
        {where : {id: req.params.userId}},
        {attributes: ['id', 'nom_utilisateur', 'description', 'email', 'profil_picture', 'admin']}
        
    )
    .then(user => res.send(user)      
    )
    .catch(error => res.status(401).json({error}))
}

//modification des données utilisateur
exports.modifyUser = (req, res, next) => {
   // const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const userObject = req.file ? {nom_utilisateur: req.body.nom_utilisateur,description: req.body.description, email: req.body.email, profil_picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body};
    User.update(
        {   
           ...userObject
        },
        {where : {id: req.params.userId}}
    )
    .then(()=> res.status(201).json({message: 'Modification du profil réussi'})     
    )
    .catch(error => res.status(401).json({error, message: 'impossible de modifier les informations de profil'}))
}
//suppression du compte utilisateur
exports.deleteUser = (req, res, next) => {  
    User.findOne({where : {id: req.params.userId}})
    .then(user => {
        const fileName = user.profil_picture.split('/images/')[1];
        fs.unlink(`images/${fileName}`, () => {
            //On supprime les commentaires de l'utilisateur 
            const deleteCom =  async ()=>{
                await Comm.destroy (
                    {where : {userId: req.params.userId}}
                )} 
            // On supprime ensuite les messages postés par l'utilisateur
            const deleteMess = async ()=> {
                await Message.destroy(
                    {where :{userId: req.params.userId}}
                )}
            // On supprime enfin le compte de l'utilisateur 
            const deleteUser =  async ()=>{
                await User.destroy(
                    {where: {id: req.params.userId}}
                )}
            deleteCom();
            deleteMess();
            deleteUser()
            return res.status(200).json({message: 'Suppression du compte et de toutes les données associées réussie'})
        })
    })
    .catch(error => res.status(500).json({error}));    
}