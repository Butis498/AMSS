const mongoose = require('mongoose');

const CartProduct = new mongoose.Schema({

    name: String,
    price: Number,
    foto: String,

});


module.exports = mongoose.model('CartProduct', CartProduct);