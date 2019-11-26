const mongoose = require('mongoose');

const Product = new mongoose.Schema({

    name: String,
    price: Number,
    foto: String,
    description: String

});


module.exports = mongoose.model('Product', Product);