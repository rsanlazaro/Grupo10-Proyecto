const { count } = require("console");
var fs = require("fs");
const path = require('path');
var config = require("../controllers/config");
var helpFunction = require("../controllers/help");
var newItemsArray = []
var cartItems = [];
if (fs.existsSync("db/cart.json")) {
    fs.readFile("db/cart.json", function (err, data) {
        cartItems = JSON.parse(data);
    });
}


exports.controller = {
    getCartItemsCount: (req, res) => {

        var count = 0;
        cartItems.forEach(item => {

            if (item.userID == req.session.userID) {
                count++;
            }
        })
        return count;
    },
    cartview: (req, res) => {
        newItemsArray = []
        if (req.session.name) {
            cartItems.forEach(item => {

                if (item.userID == req.session.userID) {
                    console.log(typeof item)
                    newItemsArray.push(item);


                    console.log(newItemsArray)
                }
            })
            res.render("products/cart.ejs", {
                msg: '',
                err: -1,
                items: newItemsArray,
                login: req.session.name ? 'ok' : 'no',
                isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
                itemsCount: this.controller.getCartItemsCount(req, res)
            })
            // res.send(cartItems);
        } else {
            res.send('<script> location.href = "/home.html" </script>');

        }

    },

    add: (req, res, data) => {
        if (req.session.name) {

            var newqq = {};


            Object.assign(newqq, {
                userID: `${req.session.userID}`
            }, data);
            cartItems.push(newqq);
            console.log(cartItems)
            saveCartItemsToFile();
            res.send('<script> location.href = "/products/productList.html" </script>');
        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }

    },
    delete: (req, res) => {
        var itemIndex = cartItems.findIndex((item) => item.productID == req.params.id);

        if (itemIndex >= 0) {

            cartItems.splice(itemIndex, 1);

            saveCartItemsToFile();
            res.send('<script> location.href = "/products/cart/view.html" </script>');
        } else {
            res.send({
                error: "product not found"
            });
        }
    }
}



function saveCartItemsToFile() {
    fs.writeFile("db/cart.json", JSON.stringify(cartItems), function (err) {
        if (err) console.log(err);
    });
}