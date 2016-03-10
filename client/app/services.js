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
  // var socket = io()
  var socket = io('/Project_2');
  // console.log($stateParams.id);
  socket.on('metrics', function (data) {
    console.log(data);
    console.log('disconnecting...');
    socket.disconnect();
    // socket.io.close();
  })
  return {
    on: function (callback) {
      // callbacks.push(callback)
    }
  }
}
