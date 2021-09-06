const fs = require("fs");
const path = require("path");
const { notify } = require("../routers/admin");
var cartItems = [];
if (fs.existsSync("db/cart.json")) {
    fs.readFile("db/cart.json", function (err, data) {
        cartItems = JSON.parse(data);
    });
}

var cart = require("./cart");

exports.controller = {
    addproduct: function (req, res) {
        if (req.session.is_Admin === 'true') {
            res.render("../views/adminProductControl.ejs", {
                err: -1,
                login: req.session.name ? 'ok' : 'no',
                items: [],
                isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            })
        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }

    },
    adminView: function (req, res) {
        if (req.session.is_Admin === 'true') {
            res.render("../views/adminProductControl.ejs", {
                err: -1,
                login: req.session.name ? 'ok' : 'no',
                items: [],
                isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            })
        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }


    },
    adminProductControl: function (req, res) {
        res.render("../views/adminProductControl.ejs", {
            err: -1
        })

    },
    // editproduct: function (req, res) {
    //     let data = fs.readFileSync(__dirname + '/../db/product.json', 'utf-8');
    //     var productArray = JSON.parse(data);
    //     var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
    //     console.log(productArray);
    //     console.log(req.params.id);
    //     console.log("indice " + productIndex);
    //     console.log(productArray[productIndex]);
    //     res.render("../views/adminEditProduct.ejs", {
    //         err: -1,
    //         login: req.session.name ? 'ok' : 'no',
    //         isAdmin: req.session.isAdmin === 'true' ? 'yes' : notify,
    //         // itemsCount: cart.controller.getCartItemsCount(req, res),
    //         item: productArray[productIndex]
    //     })
    // },
    editproduct: (req, res) => {
        let data = fs.readFileSync(__dirname + '/../db/product.json', 'utf-8');
        var productArray = JSON.parse(data);
        var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
        res.render("products/adminEditProduct.ejs", {
            item: productArray[productIndex],
            login: req.session.name ? 'ok' : 'no',
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            errormessage: "",
            itemsCount: cart.controller.getCartItemsCount(req, res)
        })
        console.log(productArray[productIndex]);
        console.log(cart.controller.getCartItemsCount(req, res));
    }
    // productitem: (req, res) => {
    //     var productIndex = productArray.findIndex((item) => item.productID == req.params.id);
    //     res.render("products/product.ejs", {
    //         item: productArray[productIndex],
    //         login: req.session.name ? 'ok' : 'no',
    //         isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
    //         errormessage: "",
    //         itemsCount: cart.controller.getCartItemsCount(req, res)
    //     })
    // }
}