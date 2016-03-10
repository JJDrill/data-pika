angular.module('DataNexus')
  .controller('LandingController', LandingController)
  .controller('ConfigureController', ConfigureController)
  .controller('SecurityController', SecurityController)
  .controller('MonitorController', MonitorController);

LandingController.$inject = ['$scope'];
function LandingController($scope) {
}

ConfigureController.$inject = ['$scope', 'ProjectServices'];
function ConfigureController($scope, ProjectServices) {
  $("[name='my-checkbox']").bootstrapSwitch();

  ProjectServices.Get_Projects().then(function(results){
    $scope.projects = results;
    console.log($scope);
  })
}

SecurityController.$inject = ['$scope'];
function SecurityController($scope) {
}

MonitorController.$inject = [ '$scope', '$stateParams', 'MetricService', 'ProjectServices'];
function MonitorController($scope, $stateParams, MetricService, ProjectServices) {
  MetricService.on(function (data) {
    console.log(data)
    // $scope.metrics.push(data)
    // $scope.average = data.average
    // $scope.$apply()
  })

  ProjectServices.Get_Projects().then(function(results){
    $scope.projects = results;
    console.log($scope);
  })
}
