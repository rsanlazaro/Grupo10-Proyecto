const fs = require('fs');
const path = require('path');

const controller = {
    index: (req, res) => {
        res.render('product');
    }
}

module.exports = controller;