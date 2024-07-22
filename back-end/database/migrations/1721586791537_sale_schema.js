'use strict'

const Schema = use('Schema');

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments();
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('unit_price', 12, 2).notNullable();
      table.decimal('total_price', 12, 2).notNullable();
      table.timestamp('date_time').notNullable();
      table.timestamp('deleted_at');
      table.timestamps();
    })
  }

  down () {
    this.drop('sales');
  }
}

module.exports = SaleSchema;
