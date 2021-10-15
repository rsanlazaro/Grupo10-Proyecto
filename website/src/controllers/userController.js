const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");

const User = require('../database-JSON/Modelos-JSON/User.js')

let userController = {
    login: (req, res) => {
      return  res.render('user/login');
    },
    register: (req, res) => {
      return res.render('user/register');
    },
    regStore: (req, res) => {
        const resultValidation = validationResult(req);
        
		if(((resultValidation.errors.length)-1)>0){ //-1 por el body('image') 
			return  res.render('user/register', {
             errors: resultValidation.mapped(),
             oldData: req.body,
           });
       }
        if(req.body.password != req.body.password_confirmation) {
            return  res.render('user/register', {
                errors: {
					password_confirmation_2: {
						msg: 'La contraseña no es igual'
					}
				},
				oldData: req.body
			});
		}
        let userInDB = User.findByField('email', req.body.email);

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

		let userToCreate = {
			name: req.body.name,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10)
		}
        let userCreated = User.create(userToCreate);
        
            let userToLogin = User.findByField('email', req.body.email);
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if(req.body.remember_user) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) 
            }
           return res.redirect('/user/profile', {
			    user: req.session.userLogged,
			    msg: false});

    },

    profile: (req, res) =>{
        return res.render('user/profile',{
		user: req.session.userLogged,
		msg: false
		});
    },

    getLogin: (req, res) =>{
        let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
            //para los usuarios administradores
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
             
			if (isOkThePassword) {
				
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
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
	},
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	updateProfile: (req, res) => {
		const resultValidation = validationResult(req);

		if(resultValidation.errors.length>0){ 
			return  res.render('user/profile', {
             errors: resultValidation.mapped(),
             oldData: req.body,
			 user: req.session.userLogged
           });
       }
	 
	   if(req.body.password != req.body.password_confirmation) {
		return  res.render('user/profile', {
			errors: {
				password_confirmation_2: {
					msg: 'La contraseña no es igual'
				}
			},
			oldData: req.body,
			user: req.session.userLogged
		});
	 }
	
	 User.update(
		{
		    id: parseInt(req.params.id),
		    name: req.body.name,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			imagen: req.file.filename
		 
	   })
	   return res.render('/user/profile', { user: req.session.userLogged, 
		                                    msg: true})
											
	}
}
//hola
module.exports = userController;
