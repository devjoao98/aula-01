const Produto = require('../Models/produto.model')


module.exports = {
    async index(req,res){
        const product = await Produto.find()
        res.json(product)
    },
    async create(req,res){

        const { nome_produto, descricao_produto, preco_produto, qtde_produto} = req.body

        let data = {}
        let product = await Produto.findOne({nome_produto})
        
        if(!product){
            data = {nome_produto, descricao_produto, preco_produto, qtde_produto}
            product = await Produto.create(data)
            return res.status(200).json(product)
        }
        else{
            return res.status(500).json({message:'Este produto ja está cadastrado!'})
        }
        
    },

    async datails(req,res){
        const product = await Produto.findOne({ _id: req.params._id })
        res.json(product)
    },

    async delete(req,res){
        const product = await Produto.findByIdAndDelete({_id: req.params._id})
        res.json(product)
    },

    async update(req, res){
        const { _id, nome_produto, descricao_produto, preco_produto, qtde_produto } = req.body
        const data = { nome_produto, descricao_produto, preco_produto, qtde_produto}
        const product = await Produto.findOneAndUpdate({_id}, data, {new:true})
        res.json(product)

    }
}