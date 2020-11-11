const express= require('express');
const router = express.Router();
const Message = require('../models/message')
const auth = require('../middleware/auth')

router.get('/', (req, res) => Message.findOne()
    .then( messages => {
        console.log(messages)
        res.sendStatus(200);})
    .catch( err => console.log(err))
)
router.post('/', auth)
router.get('/:id', auth)
router.post('/:id', auth)
router.delete('/:id', auth)
router.put('/:id', auth)

module.exports = router;
