'use strict'
const Client = use('App/Models/Client');

class ClientController {

  async index ({ response }) {
    const clients = await Client.query().select('id', 'name', 'cpf').orderBy('id').fetch();

    return response.json(clients);
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'cpf', 'account_information']);
    const client = await Client.create(data);

    return response.status(201).json(client);
  }

  async show ({ params, request, response, view }) {
    const client = await Client.query()
      .where('id', params.id)
      .with('phones')
      .with('addresses')
      .with('sales', (sales) => {
        sales.orderBy('date_time', 'desc')
      }).firstOrFail();

    return response.json(client);
  }

  async update ({ params, request, response }) {
    const client = await Client.findOrFail(params.id);
    const data = request.only(['name', 'cpf']);
    client.merge(data);
    await client.save();

    return response.json(client);
  }

  async destroy ({ params, response }) {
    const client = await Client.findOrFail(params.id);
    await client.delete();

    return response.status(204).send();
  }
}

module.exports = ClientController
