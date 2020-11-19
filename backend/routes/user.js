const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/signup', passwordValidator, userCtrl.signUp)
router.post('/login', passwordValidator, userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/profil/:userId', auth, userCtrl.getUserProfil)
router.put('/profil/:userId/modify', auth, multer, userCtrl.modifyUser )
router.delete('/profil/:userId/delete', auth, userCtrl.deleteUser)

module.exports = router;