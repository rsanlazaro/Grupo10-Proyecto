
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

    }
}