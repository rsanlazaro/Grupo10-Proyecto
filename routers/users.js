const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

let bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
bodyParser = bodyParser.urlencoded({
    extended: false
})

router.get("/user.html", user.controller.viwe)
router.get("/user/viewedit.html", user.controller.viewedit)
router.post("/edituser.html/:id", bodyParser, user.controller.edit)
router.delete("/deleteuser.html/:id", bodyParser, user.controller.delete)

module.exports = router;