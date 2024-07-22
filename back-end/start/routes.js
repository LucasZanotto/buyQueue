'use strict'

const Route = use('Route');

//Rotas para request do Login

Route.post('/register', 'AuthController.register');
Route.post("/authenticate", "AuthController.authenticate");

//Rotas para request do Client

Route.get('clients', 'ClientController.index').middleware(["auth"]);
Route.get('clients/:id', 'ClientController.show').middleware(["auth"]);
Route.post('clients', 'ClientController.store').middleware(["auth"]);
Route.patch('clients/:id', 'ClientController.update').middleware(["auth"]);
Route.delete('clients/:id', 'ClientController.destroy').middleware(["auth"]);

//Rotas para request do Product

Route.get('products', 'ProductController.index').middleware(["auth"]);
Route.get('products/:id', 'ProductController.show').middleware(["auth"]);
Route.post('products', 'ProductController.store').middleware(["auth"]);
Route.patch('products/:id', 'ProductController.update').middleware(["auth"]);
Route.delete('products/:id', 'ProductController.destroy').middleware(["auth"]);

//Rota para request do Sale

Route.post('sales', 'SaleController.store').middleware(["auth"]);