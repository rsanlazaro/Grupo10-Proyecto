//validaciones del registro
const {body} = require("express-validator");
const path = require('path');

//------------- Validations-------------------
const validRegMid = [
    body("userName")
        .notEmpty().withMessage("Escribe tu nombre").bail() //bail no siga con las validaciones
        .isLength({ min: 3}).withMessage("La longitud mínima es de 3 caracteres"),
    body("email")
        .notEmpty().withMessage("Escribe tu correo electrónico").bail()
        .isEmail().withMessage("El formato debe ser válido"),     
    body("passwordd")
        .notEmpty().withMessage("Escribe tu contraseña").bail()
        .isLength({ min: 8}).withMessage("La longitud mínima es de 8 caracteres"),
    body("password_confirmation")
        .notEmpty().withMessage("Escribe tu contraseña").bail()
        .isLength({ min: 8}).withMessage("La longitud mínima es de 8 caracteres"),
    body('user_image').custom((value, { req }) => { 
        
        let file =  req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (file != undefined) {
            
            let fileExtension =  path.extname(file.originalname);
            
            if (!acceptedExtensions.includes(fileExtension.toLowerCase())) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validRegMid;

    
