const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add-firm', 
    (req, res, next) => {
        console.log('Request received');
        next();
    },
    verifyToken,
    (req, res, next) => {
        console.log('Token verified');
        next();
    },
    firmController.addFirm
);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('content-type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));

})

router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;