const passwordValidator = require('password-validator')

const Schema = new passwordValidator()

Schema
.is().min(8)                                    // minimum de 8 caractères
.is().max(50)                                   // maximum de 50 caractères
.has().letters()                                  
.has().uppercase()                              // doit contenir au moins une majuscule
.has().lowercase()                              // doit contenir au moins une minuscule
.has().digits()                                // doit contenir au moins un chiffre
.has().not().spaces()                           // ne doit pas contenir d'espaces 


module.exports = Schema