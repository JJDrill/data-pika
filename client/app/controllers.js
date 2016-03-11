angular.module('DataNexus')
  .controller('LandingController', LandingController)
  .controller('ConfigureController', ConfigureController)
  .controller('SecurityController', SecurityController)
  // .controller('TestController', TestController)
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
  $scope.storageMetrics = {}
  
  MetricService.on(function (data) {
    // console.log("In controller: ", data)
    $scope.data = [{
      key: "Cumulative Return",
      values: [
          data
          ]
      }]
    // $scope.data = data
    $scope.$apply()
  })

  ProjectServices.Get_Projects().then(function(results){
    $scope.projects = results;
    // console.log($scope);
  })



  /* Chart options */
  $scope.options = {
      chart: {
          type: 'discreteBarChart',
          height: 450,
          margin : {
              top: 20,
              right: 20,
              bottom: 60,
              left: 55
          },
          x: function(d){ return d.label; },
          y: function(d){ return d.value; },
          showValues: true,
          valueFormat: function(d){
              return d3.format(',.4f')(d);
          },
          transitionDuration: 500,
          xAxis: {
              axisLabel: 'X Axis'
          },
          yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: 30
          }
      }
  };

  /* Chart data */
  // $scope.data = [{
  //   key: "Cumulative Return",
  //   values: [
  //       { "label" : "A" , "value" : -29.765957771107 },
  //       { "label" : "B" , "value" : 0 },
  //       { "label" : "C" , "value" : 32.807804682612 },
  //       { "label" : "D" , "value" : 196.45946739256 },
  //       { "label" : "E" , "value" : 0.19434030906893 },
  //       { "label" : "F" , "value" : -98.079782601442 },
  //       { "label" : "G" , "value" : -13.925743130903 },
  //       { "label" : "H" , "value" : -5.1387322875705 }
  //       ]
  //   }]

}




//
// TestController.$inject = [ '$scope'];
// function TestController($scope) {
//
//   console.log("Test Controller");
//
//   /* Chart options */
//   $scope.options = {
//       chart: {
//           type: 'discreteBarChart',
//           height: 450,
//           margin : {
//               top: 20,
//               right: 20,
//               bottom: 60,
//               left: 55
//           },
//           x: function(d){ return d.label; },
//           y: function(d){ return d.value; },
//           showValues: true,
//           valueFormat: function(d){
//               return d3.format(',.4f')(d);
//           },
//           transitionDuration: 500,
//           xAxis: {
//               axisLabel: 'X Axis'
//           },
//           yAxis: {
//               axisLabel: 'Y Axis',
//               axisLabelDistance: 30
//           }
//       }
//   };
//
//   /* Chart data */
//   $scope.data = [{
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
// }
