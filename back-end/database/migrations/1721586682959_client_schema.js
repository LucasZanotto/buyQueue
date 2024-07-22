'use strict'

const Schema = use('Schema');

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("cpf").notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('clients');
  }
}

module.exports = ClientSchema;
