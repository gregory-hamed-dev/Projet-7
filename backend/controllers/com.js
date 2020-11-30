const Message = require('../models/message')
const User = require('../models/user')
const Commentaire = require('../models/com')
const Com = require('../models/com')


exports.createCom = (req, res, next) => {
    Message.findOne({ attributes: ['idMessage'], where : {idMessage : req.params.messageId}})
        .then((message) =>{
            if(message) {
                Commentaire.create({ 
                commentaires: req.body.commentaires,
                userId: req.params.userid,
                messageId: req.params.messageId,
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
exports.allComs = (eq, res, next) => {
    Com.findAll({
        include: [{model : User, attributes: ['nom_utilisateur']}],
        order: [['createdAt','DESC']]
    })
    
    .then(response => res.send(response))
    .catch(error => res.status(401).json({error}))
}