const express= require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');
//const AdminRole = require("../middleware/AdminRole")

'use strict';

//routes pour les utilisateurs de base
router.post('/create/:userId', auth, messageCtrl.createNewPost) // créer des posts // *** test route ok ***
router.get('/', auth, messageCtrl.allPosts)// afficher tous les posts // *** test route ok ***
router.get('/:messageId', auth, messageCtrl.OnePostDetails)
router.put('/update/:userId/:messageId', auth, messageCtrl.updatePost) // modifier son post *** test route ok ***
router.delete('/delete/:messageId', auth, messageCtrl.deleteMessage) // effacer son post *** test route ok ***



module.exports = router;
