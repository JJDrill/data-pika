angular.module('DataNexus')
  .factory('MetricService', MetricService)
  .factory('ProjectServices', ProjectServices);


ProjectServices.$inject = ['$http']

function ProjectServices ($http) {
  return {

    Get_Projects: function(){
      return $http.get('/api/projects').then(function(projects){
        return projects.data;
      })
    },

    Add_Project: function(){
      return;
    },

    Update_Project: function(){
      return;
    },

    Delete_Project: function(){
      return;
    }
  }
}

MetricService.$inject = ['$stateParams']

function MetricService ($stateParams) {
  var callbacks = []
  var socket = io('/Project_1');
  socket.on('metrics', function (data) {
    // console.log("Project Name in service: ", $stateParams.projectName);
    callbacks.forEach(function (callback) {
      // console.log(data);
      callback(data)
    })
    // console.log('disconnecting...');
    // socket.disconnect();
    // socket.io.close();
    // callback({amount: amount, time: data.time, average: average})
  })
  return {
    on: function (callback) {
      callbacks.push(callback)
    }
  }

  // Get_Initial_Metric_Data: function(project_name){
  //   return $http.get('/api/metrics/Project 1').then(function(data){
  //     var graphSecondsTotal = 1800;
  //     var graphGranularity = 5;
  //     var graphArrayLength = graphSecondsTotal / graphGranularity;
  //
  //     rtnArray = []
  //
  //     for (var i = 0; i < graphArrayLength; i++) {
  //       //create the bucket object
  //       rtnArray.push({
  //                       key: "",
  //                       values: []
  //                     })
  //     }
  //
  //     // console.log(data.Data_Stores);
  //     for (var prop in data.Data_Stores) {
  //       // var tempObj =
  //       // {
  //       //   key: "",
  //       //   values: []
  //       // }
  //       // skip loop if the property is from prototype
  //       //  if(!data.Data_Stores.hasOwnProperty(data.Data_Stores)) continue;
  //
  //       tempObj.key = data.Data_Stores[prop].Name
  //
  //       for (var i = 0; i < data.Data_Stores[prop].Metrics.length; i++) {
  //         tempObj.values.push([
  //           new Date(data.Data_Stores[prop].Metrics[i].Date_Time),
  //           data.Data_Stores[prop].Metrics[i].Store_Depth
  //         ])
  //       }
  //       rtnArray.push(tempObj)
  //     }
  //
  //     return projects.data;
  //   })
  // }

}
