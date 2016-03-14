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

  Get_Project_Metrics: function(time_length_sec){
    var now = new Date();
    var queryGranularity = new Date(now - (1000 * time_length_sec));
    // var queryGranularity = new Date(now - (1000*60*60));

    return knex.select('*')
      .from('data_stores')
      .then(function(dataStoreList){

        // console.log(dataStoreList);
        var promises = []

        for (var i = 0; i < dataStoreList.length; i++) {
          var projectData =
          {
            Project_Name: dataStoreList[i].Name,
            Data_Stores: {}
          }
          projectData.Data_Stores[dataStoreList[i].id] = {}
          projectData.Data_Stores[dataStoreList[i].id].Name = dataStoreList[i].Name
          projectData.Data_Stores[dataStoreList[i].id].Type_ID = dataStoreList[i].Type_ID

          promises.push(
            Metrics()
            .select('Date_Time', 'Activity_Name', 'Activity_Value', 'Store_Depth')
            .where('Data_Store_ID', dataStoreList[i].id)
            .where('Date_Time', ">", queryGranularity)
            .orderBy('Date_Time')
          );
        }
console.log(projectData);

        return Promise.all(promises).then(function(metrics){

          for (var i = 0; i < metrics.length; i++) {
            // console.log(metrics[i]);
            // projectData.Data_Stores[dataStoreList[i].id]['Metrics'] = metrics[i]
          }

          // console.log(projectData);
          // console.log("--------------------------------");
          // console.log(projectData.Data_Stores[1]['Metrics']);
          // console.log(projectData.Data_Stores[2]['Metrics']);
          return projectData;
        })

        projectData.push(projectData)
      })
  }

}
