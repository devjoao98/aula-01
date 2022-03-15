const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productPrice: { type: Number},
    productQtd: {type: Number, default:0}
},{
    timestamps: true
});

const products = mongoose.model('Products', DataSchema);
module.exports = products;