
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project_groups', function(table){
    table.increments();
    table.string('Project_Name').references('Name').inTable('projects').onDelete('cascade');
    table.string('Group_Name').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('project_groups');
};
