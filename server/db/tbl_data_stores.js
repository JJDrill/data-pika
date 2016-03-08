var knex = require('../db/knex');

function Data_Stores(){
  return knex('data_stores')
};

module.exports = {

  Add_Data_Store: function(project_group_id, store_type, data_store_name){
    return Data_Stores().insert({
        Project_Group_ID: project_group_id,
        Type_ID: store_type,
        Name: data_store_name
    })
  },

  Get_List: function(store_type){
    return  Data_Stores()
            .where('Type_ID', store_type)
  },

  Delete_Data_Store: function(store_id){
    return  Data_Stores()
            .where('id', store_id)
            .del()
  }

}
