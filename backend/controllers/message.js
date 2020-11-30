
const Message = require('../models/Message');
const Sequelize = require('sequelize');
const User = require('../models/User');
const Com = require('../models/Com');


//affichage de tous les posts et des auteurs, utilisation d'une fonction sequelize pour faire un select avec jointure sur les deux tables
exports.allPosts = (req, res, next) => {
   Message.findAll({
       include: [{model : User, attributes: ['nom_utilisateur', 'profil_picture']} //double jointure sur la table user et la table com
               // {model: Com, attributes: ['userId', 'commentaires', 'createdAt']}
        ], 
       order: [['createdAt','DESC']]// affichage par odre de date de publication 
})

    .then(response => res.send(response))
    .catch(error => res.status(401).json({error}))
}
exports.OnePostDetails = (req, res, next) => {
    Message.findOne({
        include: [{model : User, attributes: ['nom_utilisateur', 'profil_picture']}],
        where: {id :req.params.messageId}
    })
        .then(message => res.send(message))
        .catch((error => res.status(404).json({error})))
}
// requête pour rechercher des posts contenant les mots entrées dans la barre de recherche dediée 
/*exports.searchPost = (req, res, next) => {
    const Op = Sequelize.Op
    Message.findAll({ 
        where: {post :{[Op.like] : `%chat%` }} // Op.like = mots clé Like dans un select mysql 
        }
    ) 
    .then( post => res.send(post))
    .catch( error => res.status(404).json({error}))
    
}*/
//création d'un nouveau post
exports.createNewPost = (req, res, next) => {
    Message.create({
        userId: req.params.userId,
        title: req.body.title,
        post: req.body.post,
    }).then(() => res.status(201).json({message: 'Post créé avec succès !'}))
      .catch(error => res.status(400).json({error}))
      
}

// modifier les données d'un post
exports.updatePost = (req, res, next) => {
    Message.update(
        {title: req.body.title, post: req.body.post},
        {where : {idMessage: req.params.messageId}}
    )
    .then(() => res.status(201).json({message: 'Vous avez modifié le post'}))
    .catch(error => res.status(404).json({error}))   
}

//suppression d'un post
exports.deleteMessage = (req, res, next) => {
    Message.destroy({ where :{idMessage: req.params.messageId}})
        .then( ()=> res.status.json({message: "Votre message a bien été effacé !"}),
                    
        )
        .catch( error => res.status(401).json({error}))
}

//like
exports.incrementLike = (req, res, next) => {
    Message.findByPk(req.params.messageId)
    .then(like => {
          return  like.increment("like", {by : 1})
    })
    .then(() => res.status(201).json({message: "like ajouté"}))
    .catch(error => res.status(400).json({error}))
}

