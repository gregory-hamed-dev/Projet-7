const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userCtrl = require('../controllers/user')
const db = require('../config/database');
const Message = require('../models/message');


router.post('/signup', userCtrl.signUp)
router.post('/login', userCtrl.login)
router.post('/logout', userCtrl.logout)
router.get('/yo', (req, res) => {
    res.send('tatacocochatobloulo')
})


module.exports = router;