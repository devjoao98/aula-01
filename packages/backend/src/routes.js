const express = require('express');

const routes = express.Router();
const User = require('./Controllers/users.controllers');
const Product = require('./Controllers/products.controllers');

routes.post('/', User.index);

//Rotas de Usuários
routes.post('/api/users', User.create);
routes.get('/api/users', User.index);
routes.get('/api/users.details/:_id', User.datails);
routes.delete('/api/users/:_id', User.delete);
routes.put('/api/users/:_id', User.update);
routes.post('/api/users/login', User.login);
routes.get('/api/users/checktoken', User.checkToken);
routes.get('/api/users/destroyToken', User.destroyToken);

//Rotas de Products
routes.post('/api/products', Product.create);
routes.get('/api/products', Product.index);
routes.get('/api/products.details/:_id', Product.datails);
routes.delete('/api/products/:_id', Product.delete);
routes.put('/api/products', Product.update);
module.exports = routes;