const Product = require('../Models/product.model');


module.exports = {
    async index(req,res){
        const product = await Product.find();
        res.json(product);
    },
    async create(req,res){

        const { productName, productDescription, productPrice, producQtd} = req.body;

        let data = {};
        let product = await product.findOne({productName});
        
        if(!product){
            data = { productName, productDescription, productPrice, producQtd };
            product = await product.create(data);
            return res.status(200).json(product);
        }
        else{
            return res.status(500).json({message:'This product is already registered!'});
        }
        
    },

    async datails(req,res){
        const product = await product.findOne({ _id: req.params._id });
        res.json(product);
    },

    async delete(req,res){
        const product = await product.findByIdAndDelete({_id: req.params._id});
        res.json(product)
    },

    async update(req, res){
        const { _id, productName, productDescription, productPrice, producQtd } = req.body;
        const data = { productName, productDescription, productPrice, producQtd};
        const product = await product.findOneAndUpdate({_id}, data, {new:true});
        res.json(product);

    }
};