var knex = require('../db/knex');

function Project_Groups(){
  return knex('project_groups')
};

module.exports = {

  Add_Group: function(project_name, group_name){
    return Project_Groups().insert({
        Project_Name: project_name,
        Group_Name: group_name
    })
  },

  Delete_Group: function(group_id){
    return  Project_Groups()
            .where('id', group_id)
            .del()
  }

}
