//validaciones del productoAgregado
const {body} = require("express-validator");
const path = require('path');

//------------- Validations-------------------
const validProductMid = [
    body('name')
        .notEmpty().withMessage("Escribe tu nombre").bail()
        .isLength({ min: 3}).withMessage("La longitud mínima es de 3 caracteres").bail(),
    body('category')
        .exists().withMessage('Elija una categoría').bail()
        .isIn(['tazas', 'termos', 'gorras','playeras','llaveros','rompecabezas','especiales']).bail(),
    body('price')
        .notEmpty().withMessage('Escribe el precio').bail()
        .isNumeric().withMessage("Escriba un número").bail(),
    body('quantity')
        .notEmpty().withMessage('Escribe la cantidad').bail()
        .isNumeric().withMessage('Escriba un número').bail(),
    body('image').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];

    if (!file) {
        throw new Error('Tienes que subir una imagen');
    } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
    }

    return true;
}),
body('description')
.notEmpty().withMessage("Escribe una descripcion").bail(),
];

module.exports = validProductMid;
