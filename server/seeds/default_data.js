
exports.seed = function(knex, Promise) {
  return knex('project_groups').del()
  .then(function(){
  return knex('projects').del();
}).then(function(){
  return knex.raw('ALTER SEQUENCE "project_groups_id_seq" RESTART WITH 1;');
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
})
};
