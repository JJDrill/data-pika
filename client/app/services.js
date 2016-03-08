angular.module('DataNexus')
  .factory('LandingService', LandingService)
  .factory('ConfigureService', ConfigureService)
  .factory('SecurityService', SecurityService)
  .factory('MonitorService', MonitorService);

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
