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
  // console.log($stateParams.id);
  socket.on('metrics', function (data) {
    callbacks.forEach(function (callback) {
      console.log("From service: ", data);
      callback({"label" : "A" , "value" : -29.765957771107})
    })
    // console.log('disconnecting...');
    // socket.disconnect();
    // socket.io.close();
    // callback({amount: amount, time: data.time, average: average})
  })
  return {
    on: function (callback) {
      callbacks.push(callback)
      // return [{
      //     key: "Cumulative Return",
      //     values: [
      //         { "label" : "A" , "value" : -29.765957771107 },
      //         { "label" : "B" , "value" : 0 },
      //         { "label" : "C" , "value" : 32.807804682612 },
      //         { "label" : "D" , "value" : 196.45946739256 },
      //         { "label" : "E" , "value" : 0.19434030906893 },
      //         { "label" : "F" , "value" : -98.079782601442 },
      //         { "label" : "G" , "value" : -13.925743130903 },
      //         { "label" : "H" , "value" : -5.1387322875705 }
      //         ]
      //     }]
    }
  }
}
