const express =  require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commCtrl = require('../controllers/com')

'use-strict'

router.post('/create', commCtrl.createCom)

module.exports = router