const express = require('express');
const router = express.Router();

const products = require('../controllers/products');
const admin = require('../controllers/admin');

let bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
bodyParser = bodyParser.urlencoded({
    extended: false
})

router.get("/addproduct.html", admin.controller.addproduct)
router.get("/showproduct.html", products.controller.allproducts)
router.get("/home.html", admin.controller.adminView)
router.get("/productControl.html", admin.controller.adminProductControl)

module.exports = router;