const fs = require('fs');
const path = require('path');

const controller = {
    index: (req, res) => {
        res.render('home');
    },
    cart: (req, res) => {
        res.render('cart');
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    }

}

module.exports = controller;