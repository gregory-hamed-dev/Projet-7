const Message = require('../models/message')
const User = require('../models/user')
const Commentaire = require('../models/com')
const Com = require('../models/com')
const Sequelize = require('sequelize');


exports.createCom = (req, res, next) => {
    Message.findOne({ where : {id: req.params.messageId}})
        .then((message) =>{
            if(message) {
                Commentaire.create({ 
                commentaires: req.body.commentaires,
                userId: req.params.userId,
                messageId: req.params.messageId
                }, 
                )
                .then(() => res.status(201).json({message :'Le commentaire a été ajouté'}))
                .catch(error => res.status(401).json({error}))
            } else {
                return res.status(409).json({'error': 'Message introuvable'}) 
            }
        })
        .catch(error => res.status(500).json({error}))
}
exports.modifyCom = (req, res, next) => {
        Commentaire.update(
            {commentaires: req.body.commentaires},
            {where : {idCom: req.params.idCom}}
        )
        .then(() => res.status(201).json({message :'Le commentaire a été modifié'}))
        .catch(error => res.status(401).json({error}))
}
exports.allComs = (req, res, next) => {
    Com.findAll({attributes : ['id', 'commentaires','userId', 'messageId', [Sequelize.fn('date_format', Sequelize.col('dateCreateCom'), '%d-%m-%Y'), 'dateCom']],
        include: [{model : User, attributes: ['nom_utilisateur', 'profil_picture']}],
        where :{messageId: req.params.messageId} 
    })
    
    .then(response => res.send(response))
    .catch(error => res.status(401).json({error}))
}