'use strict'
const Product = use('App/Models/Product');

class ProductController {

  async index ({response}) {
    const products = await Product.query().select('id', 'name', 'price').orderBy('name').fetch();

    return response.json(products);
  }

  async store ({ request, auth, response }) {
    const data = request.only(['name', 'price', 'quantity', 'description']);
    const product = await Product.create(data);

    return response.status(201).json(product);
  }

  async show ({ params, response }) {
    const product = await Product.findOrFail(params.id);

    return response.json(product);
  }

  async update ({ params, request, response }) {
    const product = await Product.findOrFail(params.id);
    const data = request.only(['name', 'price', 'quantity', 'description']);
    product.merge(data);
    await product.save();

    return response.json(product);
  }

  async destroy ({ params, request, response }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();

    return response.status(204).send();
  }
}

module.exports = ProductController
