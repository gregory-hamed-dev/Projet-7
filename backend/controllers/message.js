
const Message = require('../models/Message');
const Sequelize = require('sequelize');
const User = require('../models/User');
const Com = require('../models/Com');


//affichage de tous les posts et des auteurs, utilisation d'une fonction sequelize pour faire un select avec jointure
exports.allPosts = (req, res, next) => {
    //appel de selection avec formatage de la date
   Message.findAll({attributes : ['id', 'title', 'post', 'url', 'userId', [Sequelize.fn('date_format', Sequelize.col('dateCreate'), '%d-%m-%Y'), 'date']],
       //jointure sur la table user
       include: [{model : User, attributes: ['nom_utilisateur', 'profil_picture']}],
       // affichage par odre de date de publication descendante
       order: [['dateCreate','DESC']]
    })
    .then(response => res.send(response))
    .catch(error => res.status(401).json({error}))
}

//afffichage du profil de l'utilisateur
exports.OnePostDetails = (req, res, next) => {
    Message.findOne({attributes : ['id', 'title', 'post', 'url', 'userId', [Sequelize.fn('date_format', Sequelize.col('dateCreate'), '%d-%m-%Y'), 'date']],
        include: [{model : User, attributes: ['nom_utilisateur', 'profil_picture']}],
        where: {id :req.params.messageId}
    })
        .then(message => res.send(message))
        .catch((error => res.status(404).json({error})))
}

//création d'un nouveau post
exports.createNewPost = (req, res, next) => {
    Message.create({
        userId: req.params.userId,
        title: req.body.title,
        post: req.body.post,
        url : req.body.url
    }).then(() => res.status(201).json({message: 'Post créé avec succès !'}))
      .catch(error => res.status(400).json({error}))
      
}

// modifier les données d'un post
exports.updatePost = (req, res, next) => {
    Message.update(
        {title: req.body.title, 
        post: req.body.post,
        url: req.body.url},
        {where : {id: req.params.messageId}}
    )
    .then(() => res.status(201).json({message: 'Vous avez modifié le post'}))
    .catch(error => res.status(404).json({error}))   
}

//suppression d'un post
exports.deleteMessage = (req, res, next) => {
    // On efface d'abord les commentaires du message 
  async function deleteCom() {
    await Com.destroy (
        {where : {messageId: req.params.messageId}}
    )} 
   // On efface ensuite le message
    async function deleteMess() {
        await Message.destroy(
        {where :{id: req.params.messageId}}
    )}
    deleteCom();
    deleteMess();
    return res.status(200).json({message: 'Suppression réussie des messages et des commentaires associés'})
}


