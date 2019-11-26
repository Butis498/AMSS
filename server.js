const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const hbs = require('hbs')
require('./hbs/helpers');
const productCtrl = require('./products');
const { mongoose } = require('./Database/database.connection');


app.use(express.static(__dirname + '/public')); //conecta al directorio publico

hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine', 'hbs');

app.get('/', async(req, res) => {


    res.render('home', {
        products: await productCtrl.getProducts()
    });

});

app.post('/', async(req, res) => {


    let fun = async() => {
        await productCtrl.clearCart();
        res.redirect('/Cart')
    }


    setTimeout(fun, 3000)


});
app.get('/about', (req, res) => {

    res.render('about');

});

app.get('/LogIn', (req, res) => {

    res.render('LogIn');
});


app.get('/Register', (req, res) => {

    res.render('Register');
});


app.get('/Cart', async(req, res) => {


    res.render('Cart', {
        products: await productCtrl.getCartProducts(),
        total: await productCtrl.getPrice()
    });
})

app.post('/Cart/:id', async(req, res) => {

    await productCtrl.removeProduct(req.params.id)


    res.redirect('/Cart')


})

app.get('/Cart/:id', async(req, res) => {



    await productCtrl.addToCart(req.params.id)


    res.redirect('/Cart')


})
app.listen(port, () => {
    console.log(`Escuchando peticiones en puerto ${port}`)
});