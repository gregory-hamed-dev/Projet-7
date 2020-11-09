const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('<input  type="text" placeholder="pseudo"></input> <button>Se connecter</button>')
});
router.get('/login', (req, res) =>{
    res.send('<h1> Bravo !</h1> <p>C\'est bien la bonne page pour se logger</p> <img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F11.2F23.2F297b1cee-88ce-48b3-8e2e-ebef1b35c402.2Ejpeg/850x478/quality/90/crop-from/center/proprete-degats-comportements-genants-comment-regler-les-problemes-causes-par-les-chats.jpeg">')
});

module.exports = router;