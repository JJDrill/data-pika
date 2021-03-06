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

    Get_Project_Datastores: function(){
      return $http.get('/api/stores').then(function(datastores){
        return datastores.data;
      })
    }

  }
}

MetricService.$inject = ['$stateParams']

function MetricService ($stateParams) {
  var callbacks = []
  var socket = io('/');

  socket.on('metrics', function (data) {
    callbacks.forEach(function (callback) {
      callback(data)
    })
    // console.log('disconnecting...');
    // socket.disconnect();
    // socket.io.close();
  })
  return {
    on: function (callback) {
      callbacks.push(callback)
    }
  }

}
