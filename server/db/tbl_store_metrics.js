var knex = require('../db/knex');

function Metrics(){
  return knex('store_metrics')
};

module.exports = {

  Submit_Metrics: function(metrics){
    return Metrics().insert({
        Data_Store_ID: metrics.Data_Store_ID,
        Date_Time: metrics.Date_Time,
        Activity_Name: metrics.Activity_Name,
        Activity_Value: metrics.Activity_Value,
        Store_Depth: metrics.Store_Depth
    }).then(function(){})
  }

}
