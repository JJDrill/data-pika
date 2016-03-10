angular.module('DataNexus')
  .factory('LandingService', LandingService)
  .factory('ConfigureService', ConfigureService)
  .factory('SecurityService', SecurityService)
  .factory('MonitorService', MonitorService)
  .factory('MetricService', MetricService);;

LandingService.$inject = ['$http']

function LandingService($http) {
  // console.log("Service: LandingService")

  return {
    // getHomes: function() {
    //   return $http.get('/api/homes')
    //     .then((response) => response.data);
    // },
    // getHome: function (id) {
    //   return this.getHomes()
    //     .then((homes) => homes.find((home) => parseInt(home.id) === parseInt(id)))
    // }
  }
}

function ConfigureService($http) {
  // console.log("Service: ConfigureService")

  return {
    Get_Projects: function(){
      return $http.get('/api/projects').then(function(projects){
        return projects.data;
      })
    }
  }
}

function SecurityService($http) {
  // console.log("Service: SecurityService")

  return {
  }
}

function MonitorService($http) {
  // console.log("Service: MonitorService")

  return {
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
