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

  Get_Groups: function(){
    return Project_Groups()
  },

  Get_Groups_For_Project: function(project_name){
    return  Project_Groups()
            .where('Project_Name', project_name)
  },

  Delete_Group: function(group_id){
    return  Project_Groups()
            .where('id', group_id)
            .del()
  }

}
