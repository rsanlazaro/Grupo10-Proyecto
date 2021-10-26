//a nivel de aplicación
//mid para mostrar barra de navegación como logeado o no y si es admin o no
let db = require("../database/models");
const { Op } = require('sequelize');
const sequelize = db.sequelize;

async function userLoggedMid(req, res, next) {
	res.locals.isLogged = false;
	res.locals.isAdmin = false;

   
	let emailInCookie = req.cookies.userEmail;
	
	let userFromCookie = await db.Users.findOne({
		             where: {
			             email:{ [Op.like] : emailInCookie}
		             }
	             })
	
		if (userFromCookie) {
			delete userFromCookie.dataValues.passwordd;
			req.session.userLogged = userFromCookie.dataValues;
		}
	
		if (req.session.userLogged) {
			res.locals.isLogged = true;
			res.locals.isAdmin = req.session.userLogged.id_rol == 1 ? true : false;
			res.locals.userLogged = req.session.userLogged;
	//////////////////////////////////////////////////////////		
			let carrito = await  db.Users.findAll({
				where: { id: req.session.userLogged.id},
				include: [{association: "user_carritos"},
						  {association: "user_user_carts", attributes: ['products_id', 'cart_status'], where:{cart_status: "enproceso"}}]
			  }) 
			  console.log(carrito);
			  let indice = carrito[0].dataValues.user_user_carts[0].dataValues.products_id
			  let products = carrito[0].dataValues.user_carritos[0].dataValues.product_carts_id
			  res.locals.carrito= true;
			  if(products.length>1){
				products = products.split(",");
				var arrayOfIds = products.map(Number);
				arrayOfIds.shift()//eliminar primer elemento productID default 0
				res.locals.itemsCount = arrayOfIds.length
			}else{
				res.locals.itemsCount = 0}
		}

	next();
}

module.exports = userLoggedMid;





