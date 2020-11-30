const express =  require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commCtrl = require('../controllers/com')
const { route } = require('./User')

'use-strict'

router.post('/create//:userId/:messageId', auth, commCtrl.createCom) // *** test route ok ***
router.put('/:idCom/modify', auth, commCtrl.modifyCom)
router.get('/', auth, commCtrl.allComs )

module.exports = router