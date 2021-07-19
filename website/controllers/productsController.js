const fs = require('fs');
const path = require('path');

const controller = {
    index: (req, res) => {
        res.render('product');
    },
    create: (req, res) => {
        res.send('CREATE');
    },
    detail: (req, res) => {
        res.send('DETAIL');
    },
    edit: (req, res) => {
        res.send('EDIT');
    },
    destroy: (req, res) => {
        res.send('DESTROY');
    },
}

module.exports = controller;