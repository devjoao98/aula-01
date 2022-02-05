const express = require('express')


const routes = express.Router()
const Usuario = require('./Controllers/usuarios.controllers')
const Produto = require('./Controllers/produtos.controllers')



routes.post('/', Usuario.index)

//Rotas de Usuários
routes.post('/api/usuarios', Usuario.create)
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuarios.details/:_id', Usuario.datails)
routes.delete('/api/usuarios/:_id', Usuario.delete)
routes.put('/api/usuarios', Usuario.update)
routes.post('/api/usuarios/login', Usuario.login)
routes.get('/api/usuarios/checktoken', Usuario.checkToken)
routes.get('/api/usuarios/destroyToken', Usuario.destroyToken)

//Rotas de Produtos
routes.post('/api/produtos', Produto.create)
routes.get('/api/produtos', Produto.index)
routes.get('/api/produtos.details/:_id', Produto.datails)
routes.delete('/api/produtos/:_id', Produto.delete)
routes.put('/api/produtos', Produto.update)
module.exports = routes


