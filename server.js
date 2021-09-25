const express = require('express');
const multer = require('multer');
const path = require('path');

//-------------------- RUTAS --------------------
const routersMain = require('./routers/main');
const routersProducts = require('./routers/products');
const routersAdmin = require('./routers/admin');
const routersUsers = require('./routers/users');
//-----------------------------------------------

//-------------------- SESSION Y COOKIES --------------------
var cookieParser = require('cookie-parser');
var session = require('express-session');
//-----------------------------------------------

let bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
bodyParser = bodyParser.urlencoded({
    extended: false
})

const methodOverride = require('method-override');
var home = require("./controllers/home");
var admin = require("./controllers/admin");
var user = require("./controllers/user");
var config = require("./controllers/config");
var auth = require("./controllers/auth");
var cart = require("./controllers/cart");
var products = require("./controllers/products");
var fs = require("fs");
var productArray = [];

if (fs.existsSync("db/product.json")) {
    fs.readFile("db/product.json", function (err, data) {
        productArray = JSON.parse(data);
    });
}

//set storge engine
const storge = multer.diskStorage({
    destination: './public/upload',
    filename: function (req, file, cb) {
        cb(null, `${productArray.length == 0 ? 1 : Number(productArray[productArray.length - 1].productID) + 1}-${req.body.productName}-${Date.now()}-${file.originalname}`);
    }
});

//init upload 
const upload = multer({
    storage: storge,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("image");


//check File Type
function checkFileType(file, cb) {
    //allowed extension
    const fileTypes = /jpeg|jpg|png|gif/;

    //check extetion
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    //check mime
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb({
            message: 'Images Only'
        });
    }

}

// init app
const app = express();
const port = 3000;

//ejs
app.set('view engine', 'ejs');

// method override
app.use(methodOverride('_method'));

// Post
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//-----------------------------------------------
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000000000, expires: new Date(Date.now() + 60000000000) } }))
//-----------------------------------------------

// public folder
app.use(express.static('./public/upload'));
app.use(express.static('./public/upload/usersImges'));
app.use(express.static('./public'));
app.use('/users/user/assets', express.static(__dirname + '/public/assets'));
app.use('/users/assets', express.static(__dirname + '/public/assets'));
app.use('/home/assets', express.static(__dirname + '/public/assets'));
app.use('/admin/assets', express.static(__dirname + '/public/assets'));
app.use('/products/cart/assets', express.static(__dirname + '/public/assets'));
app.use('/products/cart/view.html/assets', express.static(__dirname + '/public/assets'));
app.use('/products/assets', express.static(__dirname + '/public/assets'));
app.use('/products/product/assets', express.static(__dirname + '/public/assets'));
app.use('/products/productDetails.html/assets', express.static(__dirname + '/public/assets'));
app.use('/users/edituser.html/assets', express.static(__dirname + '/public/assets'));
app.use('/users/edituser.html/', express.static('./public/upload/usersImges'));
app.use('/users', express.static('./public/upload/usersImges'));
app.use('/users/user', express.static('./public/upload/usersImges'));
app.use('/products/cart/view.html', express.static('./public/upload'));
app.use('/products/productDetails.html', express.static('./public/upload'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/upload', express.static(__dirname + '/public'));
app.use('/products', express.static("./public/upload"));

app.use('/', routersMain);
app.use('/products', routersProducts);
app.use('/admin', routersAdmin);
app.use('/users', routersUsers);

app.listen(port, () => console.log(`Server started on port ${port}`))