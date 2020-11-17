const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signUp)
router.post('/login', userCtrl.login)
router.post('/logout', userCtrl.logout)
router.delete('/deleteUser/:userId', userCtrl.deleteUser)

module.exports = router;