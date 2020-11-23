const express =  require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commCtrl = require('../controllers/com')
const { route } = require('./User')

'use-strict'

router.post('/:userId/:messageId/create', auth, commCtrl.createCom) // *** test route ok ***
router.put('/:idCom/modify', auth, commCtrl.modifyCom)
router.get('/', commCtrl.allComs )

module.exports = router