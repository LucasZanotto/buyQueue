'use strict'
const Sale = use('App/Models/Sale');
const Product = use('App/Models/Product');

class SaleController {

  async store ({ request, response }) {
    const data = request.only(['client_id', 'product_id', 'quantity', 'unit_price']);

    data.total_price = data.quantity * data.unit_price;
    data.date_time = new Date();

    const sale = await Sale.create(data);

    const product = await Product.find(data.product_id);

    if (product) {
      const newQuantity = product.quantity - data.quantity;

      if (newQuantity < 1) {
        return response.status(400).json({message:"Desculpe, mas estamos sem estoque desse produto!!"});
      }

      product.quantity = newQuantity;
      await product.save();
    }

    return response.status(201).json(sale);
  }
}

module.exports = SaleController
