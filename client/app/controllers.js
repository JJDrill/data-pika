angular.module('DataNexus')
  .controller('LandingController', LandingController)
  .controller('ConfigureController', ConfigureController)
  .controller('SecurityController', SecurityController)
  .controller('MonitorController', MonitorController);

LandingController.$inject = ['$scope', 'LandingService'];

function LandingController($scope, LandingService) {
  console.log("Controller: LandingController")
  // RealEstateService.getHomes()
  //   .then(function(homes){
  //     $scope.homes = homes;
  //   });
}

ConfigureController.$inject = ['$scope', 'ConfigureService'];

function ConfigureController($scope, ConfigureService) {
  console.log("Controller: ConfigureController")
  $("[name='my-checkbox']").bootstrapSwitch();
  // RealEstateService.getHomes()
  //   .then(function(homes){
  //     $scope.homes = homes;
  //   });
}

SecurityController.$inject = ['$scope', 'SecurityService'];

function SecurityController($scope, SecurityService) {
  console.log("Controller: SecurityController")
  // RealEstateService.getHomes()
  //   .then(function(homes){
  //     $scope.homes = homes;
  //   });
}

MonitorController.$inject = ['$scope', 'MonitorService'];

function MonitorController($scope, MonitorService) {
  console.log("Controller: MonitorController")
  // RealEstateService.getHomes()
  //   .then(function(homes){
  //     $scope.homes = homes;
  //   });
}
