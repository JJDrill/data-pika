
exports.up = function(knex, Promise) {
  return knex.schema.createTable('data_stores', function(table){
    table.increments();
    table.integer('Project_Group_ID').references('id').inTable('project_groups').onDelete('cascade');
    table.string('Type_ID').references('Name').inTable('store_types').onDelete('cascade');
    table.string('Name').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('data_stores');
};
