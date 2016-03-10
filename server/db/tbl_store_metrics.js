var knex = require('../db/knex');

function Metrics(){
  return knex('store_metrics')
};

function Data_Stores(){
  return knex('data_stores')
};

module.exports = {

  Submit_Metrics: function(metrics){
    return Metrics().insert({
        Data_Store_ID: metrics.Data_Store_ID,
        Date_Time: metrics.Date_Time,
        Activity_Name: metrics.Activity_Name,
        Activity_Value: metrics.Activity_Value
      }).then()
  },

}
