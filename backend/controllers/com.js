const Message = require('../models/message')
const User = require('../models/user')
const Commentaire = require('../models/com')


exports.createCom = (req, res, next) => {
    Message.findOne({ attributes: ['idMessage'],where : {idMessage : 3}})
        .then((message) =>{
            if(message) {
                Commentaire.create({
                userId: 1,
                commentaires: 'Bonjour Admin, je suis content'
                })
                .then(() => res.status(201).json({message :'Le commentaire a été ajouté'}))
                .catch(error => res.status(401).json({error}))
            } else {
                return res.status(409).json({'error': 'Message introuvable'}) 
            }
        })
        .catch(error => res.status(500).json({error}))
}