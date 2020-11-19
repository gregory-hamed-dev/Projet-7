const express= require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');
const AdminRole = require("../middleware/AdminRole")

'use strict';

//routes pour les utilisateurs de base
router.post('/create', auth, messageCtrl.createNewPost) // créer des posts // *** test route ok ***
router.get('/',  messageCtrl.allPosts)// afficher tous les posts // *** test route ok ***
router.put('/:id/edit', auth, messageCtrl.updatePost) // modifier son post *** test route ok ***
router.delete('/:id/delete', auth, messageCtrl.deleteMessage) // effacer son post *** test route ok ***
router.post('/:id/like', auth, messageCtrl.incrementLike) // liker un post *** test route ok ***
router.get('/search', auth, messageCtrl.searchPost)//recherche de post(s) répondant au critère renseigné *** test ok ***


module.exports = router;
