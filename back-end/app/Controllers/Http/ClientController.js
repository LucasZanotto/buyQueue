'use strict'
const Client = use('App/Models/Client');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const clients = await Client.query().select('id', 'name', 'cpf').orderBy('id').fetch()
    return response.json(clients)
  }

  /**
   * Render a form to be used for creating a new client.
   * GET clients/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store ({ request, response }) {
    const data = request.only(['name', 'cpf', 'account_information'])
    const client = await Client.create(data)
    return response.status(201).json(client)
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const client = await Client.query()
      .where('id', params.id)
      .with('phones')
      .with('addresses')
      .with('sales', (builder) => {
        builder.orderBy('date_time', 'desc')
      }).firstOrFail()

    return response.json(client)
  }

  /**
   * Render a form to update an existing client.
   * GET clients/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const client = await Client.findOrFail(params.id)
    const data = request.only(['name', 'cpf', 'account_information'])
    client.merge(data)
    await client.save()
    return response.json(client)
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const client = await Client.findOrFail(params.id)
    await client.delete()

    return response.status(204).send();
  }
}

module.exports = ClientController
