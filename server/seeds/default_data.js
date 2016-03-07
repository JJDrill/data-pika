
exports.seed = function(knex, Promise) {
  return knex('project_groups').del()
  .then(function(){
  return knex('projects').del();
}).then(function(){
  return knex.raw('ALTER SEQUENCE "project_groups_id_seq" RESTART WITH 1;');
}).then(function(){
  return Promise.all([
    knex('store_types').insert({Name: 'Queue'}),
    knex('store_types').insert({Name: 'Stack'}),
  ]);
}).then(function(){
  return Promise.all([
    knex('projects').insert({Name: 'Project 1'}),
    knex('projects').insert({Name: 'Project 2'}),
    knex('projects').insert({Name: 'Project 3'}),
  ]);
}).then(function(){
  return Promise.all([
    knex('project_groups').insert({
      Project_Name: 'Project 1',
      Group_Name: 'DEV'
    }),
    knex('project_groups').insert({
      Project_Name: 'Project 1',
      Group_Name: 'QA'
    }),
    knex('project_groups').insert({
      Project_Name: 'Project 1',
      Group_Name: 'PERF'
    }),
    knex('project_groups').insert({
      Project_Name: 'Project 2',
      Group_Name: 'DEV'
    }),
    knex('project_groups').insert({
      Project_Name: 'Project 2',
      Group_Name: 'QA'
    }),
  ]);
}).then(function(){
  return Promise.all([
    knex('data_stores').insert({
      Project_Group_ID: 1,
      Type_ID: 'Queue',
      Name: 'Test Queue 1'
    }),
    knex('data_stores').insert({
      Project_Group_ID: 1,
      Type_ID: 'Queue',
      Name: 'Test Queue 2'
    }),
    knex('data_stores').insert({
      Project_Group_ID: 1,
      Type_ID: 'Queue',
      Name: 'Test Queue 3'
    }),
  ]);
})
};
