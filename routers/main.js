const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const home = require('../controllers/home');

let bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
bodyParser = bodyParser.urlencoded({
    extended: false
})

router.get("/", home.controller.index);
router.get("/users/login.html", auth.controller.loginView)
router.get("/login.html", auth.controller.loginView)
router.get("/register.html", auth.controller.registerView)
router.post("/login.html", bodyParser, auth.controller.login)
router.post("/register.html", bodyParser, auth.controller.register)
router.get("/home.html/logout", home.controller.logout);
router.get("/home.html", home.controller.homeView);
router.get("/about.html", home.controller.aboutView);

module.exports = router;