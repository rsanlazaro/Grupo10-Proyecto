// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/cart', mainController.cart);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

module.exports = router;