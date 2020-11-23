const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/signup', passwordValidator, userCtrl.signUp) // *** test route ok ***
router.post('/login', passwordValidator, userCtrl.login)//  *** test route ok ***
router.get('/logout', userCtrl.logout)
router.get('/profil', auth, userCtrl.getUserProfil)//  *** test route ok ***
router.put('/profil/:userId/modify', auth, multer, userCtrl.modifyUser )// *** test route ok ***
router.delete('/profil/:userId/delete', auth, userCtrl.deleteUser)

module.exports = router;