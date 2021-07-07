const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

var homeRouter = require('./routes/home');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/product');
var registerRouter = require('./routes/register');

app.use('/', homeRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/product', productRouter);

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});