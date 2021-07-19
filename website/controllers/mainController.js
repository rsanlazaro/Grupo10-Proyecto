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
    },
    CrearEditarProductos: (req, res) => {
        res.render('CrearEditarProductos');
    }


}

module.exports = controller;