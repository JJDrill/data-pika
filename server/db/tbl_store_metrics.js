var knex = require('../db/knex');

function Metrics(){
  return knex('store_metrics')
};

function Data_Stores(){
  return knex('data_stores')
};

var get_Store_Metrics = function(store_id){
  return Metrics()
    .where('Data_Store_ID', store_id)
    .select()
    // .then(function(result){
    //   console.log(result);
    //   return result
    // })
}

module.exports = {

  Submit_Metrics: function(metrics){
    return Metrics().insert({
        Data_Store_ID: metrics.Data_Store_ID,
        Date_Time: metrics.Date_Time,
        Activity_Name: metrics.Activity_Name,
        Activity_Value: metrics.Activity_Value,
        Store_Depth: metrics.Store_Depth
      }).then()
  },

  Get_Project_Metrics: function(project_name){
    return knex.select('*')
      .from('data_stores')
      .where('Project_Name', project_name)
      .then(function(dataStoreList){

        var returnData =
          {
            Project_Name: project_name,
            Data_Stores: {}
          }

        var promises = []

        for (var i = 0; i < dataStoreList.length; i++) {
          returnData.Data_Stores[dataStoreList[i].id] = {}
          returnData.Data_Stores[dataStoreList[i].id].Name = dataStoreList[i].Name
          returnData.Data_Stores[dataStoreList[i].id].Type_ID = dataStoreList[i].Type_ID

          promises.push(
            Metrics()
            .select('Date_Time', 'Activity_Name', 'Activity_Value', 'Store_Depth')
            .where('Data_Store_ID', dataStoreList[i].id)
            .orderBy('Date_Time')
          );
        }

        return Promise.all(promises).then(function(metrics){
          for (var i = 0; i < metrics.length; i++) {
            returnData.Data_Stores[dataStoreList[i].id]['Metrics'] = metrics[i]
          }

          // console.log(returnData);
          // console.log("--------------------------------");
          // console.log(returnData.Data_Stores[1]['Metrics']);
          // console.log(returnData.Data_Stores[2]['Metrics']);
          return returnData;
        })
      })
  }

}
