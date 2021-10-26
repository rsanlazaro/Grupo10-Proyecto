const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
let db = require("../database/models");


let userController = {
    login: (req, res) => {
      return  res.render('user/login');
    },
    register: (req, res) => {
      return res.render('user/register');
    },
    regStore: async(req, res) => {
		
        const resultValidation = validationResult(req);

		if(((resultValidation.errors.length)-1)>0){ //-1 por el body('image') 
			return  res.render('user/register', {
             errors: resultValidation.mapped(),
             oldData: req.body,
           });
       }

        if(req.body.passwordd != req.body.password_confirmation) {
            return  res.render('user/register', {
                errors: {
					password_confirmation_2: {
						msg: 'La contraseña no es igual'
					}
				},
				oldData: req.body
			});
		}

        await db.Users.findOne({
            where: {
                email: req.body.email
			 }
        }).then((userInDB) => {
		 
		if (userInDB) {
			 return res.render('user/register', {
				errors: {
					email_2: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
	    }
	})
	        
			 let usuario = await db.Users.create({
				userName: req.body.userName,
				id_rol: req.body.email == "aleguamen_@hotmail.com"|| req.body.email == "rsanlazaro@hotmail.com"? 1: 2,
				email: req.body.email,
				passwordd: bcryptjs.hashSync(req.body.passwordd, 10),
				user_image: null
			  })
			  
			  
			 await db.Carts.create({product_carts_id: 0},{
				where: {id: usuario.dataValues.id} 
				
			})
			
			 await db.User_carts.create({
				user_id: usuario.dataValues.id,
				products_id: usuario.dataValues.id,
				cart_status: "enproceso"
			  })
			
			  
			  if(usuario) {
				res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) 
			 }
				 
			   
			   return res.redirect('/');
		  
    },

    profile: async (req, res) =>{
		
		delete req.session.userLogged.passwordd
        
		return res.render('user/profile',{
		user: req.session.userLogged,
		});
	
    },

    getLogin: (req, res) =>{
		
		db.Users.findOne({
               where: {
                   email: req.body.email
            }
        }).then((userToLogin) => {
			
		if(userToLogin) {
            //para los usuarios administradores
			
			let isOkThePassword = bcryptjs.compareSync(req.body.passwordd, userToLogin.passwordd);
            
 
			if (isOkThePassword) {
				
				delete userToLogin.passwordd;
				req.session.userLogged = userToLogin
				
				if(req.body.rememberme) {
					 res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) 
				}

			      return res.redirect('/');
			  }
			
			return res.render('user/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
	     }

		return res.render('user/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	  });
	},
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	updateProfile: async (req, res) => {
         
		const resultValidation = validationResult(req);

		if(resultValidation.errors.length>0){ 
			return  res.render('user/profile', {
             errors: resultValidation.mapped(),
             oldData: req.body,
			 user: req.session.userLogged
           });
       }
	 
	   if(req.body.passwordd != req.body.password_confirmation) {
		return res.render('user/profile', {
			  errors: {
				password_confirmation_2: {
					msg: 'La contraseña no es igual'
				}
			},
			oldData: req.body,
			user: req.session.userLogged
		});
	}
	
		 await db.Users.update({
			userName: req.body.userName,
			id_rol: req.body.email == "aleguamen_@hotmail.com"|| req.body.email == "rsanlazaro@hotmail.com"? 1: 2,
			email: req.body.email,
			passwordd: bcryptjs.hashSync(req.body.passwordd, 10),
			user_image: req.file == undefined? null : req.file.filename
	   },{
		   where: {id: req.params.id} 
	   })

     
	   var usuario =await db.Users.findOne({
		    where: {
			email: req.body.email
		 }
	  })
	    req.session.userLogged.user_image = usuario.user_image
		
	    return res.render('user/profile',{
		user: req.session.userLogged,
		msg: true
		});					
	}
}

module.exports = userController;
