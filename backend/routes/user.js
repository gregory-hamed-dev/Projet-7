const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator');
const auth = require('../middleware/auth')
const multerConfiguration = require('../middleware/multer-config')

router.post('/signup', passwordValidator, userCtrl.signUp) // *** test route ok ***
router.post('/login', passwordValidator, userCtrl.login) // *** test route ok ***
router.get('/profils',auth, userCtrl.getAllUsers) // *** test route ok ***
router.get('/profil/:userId', auth, userCtrl.getUserProfil) // *** test route ok ***
router.put('/profil/modify/:userId', auth, multerConfiguration, userCtrl.modifyUser) // *** test route ok ***
router.delete('/profil/delete/:userId', auth, userCtrl.deleteUser)

module.exports = router;
