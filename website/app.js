const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE

app.use(express.static('public'));
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.set('view engine', 'ejs');

const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

app.use('/', mainRouter);
app.use('/product', productsRouter);
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

app.listen(3000, () => {
    console.log('Servidor funcionando');
});

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});