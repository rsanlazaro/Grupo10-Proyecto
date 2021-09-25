var fs = require("fs");
const multer = require('multer');
const path = require('path');
var config = require("../controllers/config");
var helpFunction = require("../controllers/help");

var cart = require("./cart");
//set storge engine
const storge = multer.diskStorage({
    destination: './public/upload',
    filename: function (req, file, cb) {
        cb(null, `${productArray.length == 0 ? 1 : Number(productArray[productArray.length - 1].productID) + 1}-${req.body.name}-${Date.now()}-${file.originalname}`);
    }
});

//init upload 
const upload = multer({
    storage: storge,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        // checkFileType(file, cb);
        helpFunction.controller.checkFileType(file, cb);
    }
}).single("image");



// //check File Type
// function checkFileType(file, cb) {
//     //allowed exteion
//     const fileTypes = /jpeg|jpg|png|gif/;

//     //check extetion
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//     //check mime
//     const mimeType = fileTypes.test(file.mimetype);

//     if (mimeType && extName) {
//         return cb(null, true);
//     } else {
//         cb({
//             message: 'Images Only'
//         });
//     }

// }


exports.controller = {
    allproducts: function (req, res) {
        if (req.session.is_Admin === 'true') {
            if (productArray.length == 0) {
                res.render('adminProductControl', {
                    msg: 'No message',
                    login: req.session.name ? 'ok' : 'no',
                    err: 0,
                    items: [],
                    itemsCount: cart.controller.getCartItemsCount(req, res)

                });
            } else {
                res.render('adminProductControl', {
                    msg: 'No message',
                    login: req.session.name ? 'ok' : 'no',
                    isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                    err: 0,
                    items: productArray,
                    itemsCount: cart.controller.getCartItemsCount(req, res)

                });
            }
        } else {

        }
    },
    cartview: (req, res) => {
        if (req.session.name) {
            res.render("products/cart.ejs", {
                msg: '',
                err: -1,
                login: req.session.name ? 'ok' : 'no',
                isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                itemsCount: cart.controller.getCartItemsCount(req, res)
            })
        } else {
            res.send('<script> location.href = "/home.html" </script>');

        }

    },
    allproductsView: function (req, res) {
        console.log(req.session);
        res.render("products/productList.ejs", {
            msg: '',
            err: -1,
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            login: req.session.name ? 'ok' : 'no',
            itemsCount: cart.controller.getCartItemsCount(req, res)
        })
    },
    productsViewByPage: (req, res) => {

        var lB = ((req.params.id * 6) - 6);
        var uB = (req.params.id * 6);
        if (config.controller.mode == 'devolopment') {
            console.log(req.params.id);
            console.log(lB)
            console.log(uB)
            console.log("productArray.length -> " + productArray.length)
        }
        if ((lB < productArray.length) && (uB <= productArray.length)) {
            var newArray = [];
            var count = 0;
            let obj = { }

            for (var i = lB; i < uB; i++) {
                newArray.push(productArray[i]);
                count++;
                //console.log( productArray[i])
            }
            Object.assign(obj, {
                page: req.params.id,
                imgprepage: count,
                total: productArray.length,
                data: newArray
            })

            res.send(obj)
        } else {
            if ((lB < productArray.length) && (uB > productArray.length)) {
                var newArray = [];
                var count = 0;
                for (var i = lB; i < productArray.length; i++) {
                    newArray.push(productArray[i]);
                    count++;
                }
                let obj = { }
                Object.assign(obj, {
                    page: req.params.id,
                    imgprepage: count,
                    total: productArray.length,
                    data: newArray
                })

                res.send(obj)
            } else {
                if ((lB >= productArray.length)) {
                    res.send({
                        message: "No data"
                    });
                }
            }
        }
        console.log(req.params.id)


    },
    add: (req, res) => {
        if (req.session.is_Admin === 'true') {
            upload(req, res, (error) => {
                if (error) {
                    res.render('adminProductControl', {
                        msg: `Error: ${error.message}`,
                        login: req.session.name ? 'ok' : 'no',
                        isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                        items: [],
                        err: true,
                        itemsCount: cart.controller.getCartItemsCount(req, res)
                    });
                } else {
                    if (req.file == undefined) {
                        res.render('adminProductControl', {
                            msg: 'Error: No File Selected',
                            login: req.session.name ? 'ok' : 'no',
                            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                            items: [],
                            err: 1,
                            itemsCount: cart.controller.getCartItemsCount(req, res)
                        });
                    } else {
                        if (config.controller.mode == 'devolopment') {
                            console.log(req.file);
                            console.log(req.body);
                        }
                        var newqq = { };
                        var id;
                        if (productArray.length == 0) {
                            id = 1;
                        } else {
                            id = Number(productArray[productArray.length - 1].productID) + 1;
                        }
                        if (config.controller.mode == 'devolopment') {
                            console.log('hi -> ' + req.file.filename);
                        }
                        Object.assign(newqq, {
                            productID: `${id}`
                        }, req.body, {
                            productImage: `${req.file.filename}`
                        });

                        // Object.assign(newqq, {
                        //     productImage: `${req.file.filename}`
                        // });

                        productArray.push(newqq);
                        saveProductArrayToFile();

                        if (config.controller.mode == 'devolopment') {
                            console.log(productArray.length)
                        }
                        let obj = { }
                        Object.assign(obj, {
                            page: 1,
                            imgprepage: productArray.length,
                            data: productArray
                        })

                        if (config.controller.mode == 'devolopment') {
                            console.log(obj.data[7])
                        }

                        res.render('adminProductControl', {
                            msg: 'File Uploaded',
                            login: req.session.name ? 'ok' : 'no',
                            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                            err: 0,
                            items: productArray,
                            file: `upload/${req.file.originalname}`,
                            itemsCount: cart.controller.getCartItemsCount(req, res)
                        });
                    }
                }
            });
        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }

    },
    delete: (req, res) => {
        var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
        var imageName = '';
        if (productIndex >= 0) {
            imageName = productArray[productIndex].productImage;
            productArray.splice(productIndex, 1);

            saveProductArrayToFile();
            try {
                fs.unlinkSync(`public/upload/${imageName}`);



            } catch (e) {
                res.status(400).send({
                    message: "Error deleting image!",
                    error: e.toString(),
                    req: req.body
                });
            }
            res.send({
                success: "product deleted"
            });
        } else {
            res.send({
                error: "product not found"
            });
        }
    },
    productitem: (req, res) => {
        var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
        res.render("products/product.ejs", {
            item: productArray[productIndex],
            login: req.session.name ? 'ok' : 'no',
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            errormessage: "",
            itemsCount: cart.controller.getCartItemsCount(req, res)
        })
    },
    addtocart: (req, res) => {
        if (req.session.name) {
            var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
            cart.controller.add(req, res, productArray[productIndex]);
        } else {

            res.send('<script> location.href = "/login.html" </script>');

        }

    }
}


var productArray = [];
if (fs.existsSync("db/product.json")) {
    fs.readFile("db/product.json", function (err, data) {
        productArray = JSON.parse(data);
    });
}

function saveProductArrayToFile() {
    fs.writeFile("db/product.json", JSON.stringify(productArray), function (err) {
        if (err) console.log(err);
    });
}