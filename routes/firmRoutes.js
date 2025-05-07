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

module.exports = router;