var cart = require("../controllers/cart");
exports.controller = {
    index: function (req, res) {
        res.render('index', {
            msg: '',
            err: -1,
            login: req.session.name ? 'ok' : 'no',
            // isAdmin:"no"
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no'
        })
    },
    logout: function (req, res) {

        req.session.destroy();

        res.send("<script>location.href= '/home.html'</script>");

    },
    homeView: function (req, res) {
        res.render("../views/index.ejs", {

            msg: '',
            err: -1,
            login: req.session.name ? 'ok' : 'no',
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            itemsCount: cart.controller.getCartItemsCount(req, res)
        })

    },
    aboutView: function (req, res) {

        res.render("../views/about.ejs", {

            msg: '',
            err: -1,
            login: req.session.name ? 'ok' : 'no',
            isAdmin: req.session.isAdmin === 'true' ? 'yes' : 'no',
            itemsCount: cart.controller.getCartItemsCount(req, res)
        })

    }
}