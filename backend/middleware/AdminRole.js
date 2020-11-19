 
 
 module.exports = (req, res, next) => {
        if (req.user.id !== 1) {
            res.status(401)
            return res.send('Seul l\'admin est authorisé à accéder à cette page')
        }
         next()
    }


