const Schema = require('../models/Password');
  
//vérifie que l'utilisateur utilise bien le schema imposé lors de la création de son mot de passe
module.exports = (req, res, next) => {
    //si le mot de passe n'est pas assez fort 
    if (!Schema.validate('Alfd15MPl')) {
        return res.status(400).json({error: 'Le mot de passe que vous avez choisi n\'est pas assez fort !' + Schema.validate('Alfd15MPl', {list : true})})
    } else {
        next()
    }  
}