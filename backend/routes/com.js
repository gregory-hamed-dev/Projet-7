const express =  require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commCtrl = require('../controllers/com')
const { route } = require('./User')

'use-strict'

router.post('/:userId/:messageId', auth, commCtrl.createCom) // *** test route ok ***
router.put('/modify/:id', auth, commCtrl.modifyCom)
router.get('/:messageId', auth, commCtrl.allComs ) //*** test route ok ***
router.delete('/delete/:id', auth, commCtrl.deleteCom)

module.exports = router