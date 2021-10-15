//----------------REQUIRES----------------
//require("dotenv").config();
const express = require('express'); //es un framework
//const multer = require('multer'); // subir archivos https://www.youtube.com/watch?v=MnYxElyhI4w
const path = require('path'); // to access & interact to file System
const methodOverride = require('method-override');  //para enviar tambien put o delete
//const logger = require('morgan'); // formatos para loguear información
//const { cookie } = require('express-validator');
const userLoggedMid = require('./middlewares/userLoggedMid')// Middleware de aplicación

//-------------------- SESSION Y COOKIES --------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');

//--- Init APP
const app = express();
const port = 3000;

//-----------SE IMPORTAN LAS RUTAS --------------------
const routersMain = require('./routers/main');
const routersProducts = require('./routers/product');
const routersUsers = require('./routers/user');

//---------CONFIGURACIONES--------------
app.set("views", path.join(__dirname, './views'));
app.set('view engine', 'ejs'); // motor de plantillas a usar

//-------------MIDDLEWARES----------
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
   secret : 'something',
   resave :false,
   saveUninitialized: false
}));
app.use(userLoggedMid); //debe ir despues de session
app.use(methodOverride('_method')); // Para sobrescribir el method="POST" en el formulario por PUT y DELETE
//app.use(logger('dev'));// formatos

//--------RUTAS-------------
app.use('/', routersMain);
app.use('/product', routersProducts);
app.use('/user', routersUsers);

//---RUTAS PARA EL ERROR 404-------


//----SE INICIALIZA EL SERVIDOR------
app.listen(port, () => console.log(`Server started on port ${port}`))