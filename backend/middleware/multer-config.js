const multer = require('multer');
//type d'extension de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
//endroit où l'image uploadée est stockée
    destination: (req, file, cback) => {
        cback(null, 'images')
    },
//nom donné au fichier lors du stockage 
    filename: (req, file, cback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPES[file.mimetype];
        cback(null, name + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');