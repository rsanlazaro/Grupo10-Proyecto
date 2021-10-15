const express = require('express');
const router = express.Router();


const userController= require('../controllers/userController');

//------------middlewares------
const validRegMid = require('../middlewares/validRegMid');
const guestMid = require('../middlewares/guestMid');
const authMid = require('../middlewares/authMid');
const multerMid = require('../middlewares/multerMid');


//---------se muestra formulario de login----------
router.get('/login', guestMid ,userController.login);

//----------se procesa formulario de login-----------
router.post('/login',  userController.getLogin);

//---------se muestra formulario de registro----------
router.get('/register', guestMid, userController.register);

//---------se procesa el registro y se guarda al usuario registrado-------
router.post('/register', validRegMid, userController.regStore);

//------------------- Perfil de usuario ------------------------
router.get('/profile/:id', authMid, userController.profile);

//------------------- Editar perfil de usuario ------------------------
router.put('/profile/actualizar/:id', multerMid.single('image'), validRegMid, userController.updateProfile)

//------------- Cierra sesión ---------------
router.get('/logout', userController.logout);


module.exports = router;