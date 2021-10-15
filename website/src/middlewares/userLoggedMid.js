//a nivel de aplicación
//mid para mostrar barra de navegación como logeado o no y si es admin o no
const User = require('../database-JSON/Modelos-JSON/User.js') 
const Cart = require('../database-JSON/Modelos-JSON/Cart.js') 

function userLoggedMid(req, res, next) {
	res.locals.isLogged = false;
	res.locals.isAdmin = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.isAdmin = (req.session.userLogged.role == "administrador")? true : false;
		res.locals.userLogged = req.session.userLogged;
		res.locals.carrito = Cart.findByField('userID', req.session.userLogged.id)
		res.locals.itemsCount = res.locals.carrito == undefined? 0 : res.locals.carrito.productsID.length;
	}

	next();
}

module.exports = userLoggedMid;
