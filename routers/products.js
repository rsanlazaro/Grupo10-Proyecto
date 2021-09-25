const express = require('express');
const router = express.Router();

const products = require('../controllers/products');
const cart = require('../controllers/cart');

let bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
bodyParser = bodyParser.urlencoded({
    extended: false
})

router.get("/allproduct.html", products.controller.allproducts)
router.get("/product/cart.html", products.controller.cartview)
router.get("/productList.html", products.controller.allproductsView)
router.get("/productList.html/:id", products.controller.productsViewByPage)
router.get("/add.html", bodyParser, products.controller.allproducts)
router.post("/add.html", bodyParser, products.controller.add)
router.delete("/delete.html/:id", bodyParser, products.controller.delete)
router.get("/cart/view.html", bodyParser, cart.controller.cartview)
router.post("/cart/add.html", bodyParser, cart.controller.add)
// router.get("/cart/add.html/:data", bodyParser, cart.controller.add)
router.get("/cart/delete.html/:id", bodyParser, cart.controller.delete)
router.get("/productDetails.html/:id", products.controller.productitem)
router.get("/addtocart.html/:id", products.controller.addtocart)

module.exports = router;