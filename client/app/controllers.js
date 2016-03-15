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
    // console.log($scope);
  })
}

SecurityController.$inject = ['$scope'];

function SecurityController($scope) {
}


MonitorController.$inject = [ '$scope', '$stateParams', 'MetricService', 'ProjectServices'];

function MonitorController($scope, $stateParams, MetricService, ProjectServices) {
  $scope.storageList = {}

  ProjectServices.Get_Project_Datastores().then(function(projectlist){

    for (var i = 0; i < projectlist.length; i++) {

      if ($scope.storageList[projectlist[i].Project_Name] === undefined) {
        $scope.storageList[projectlist[i].Project_Name] = []
      }

      var tempObj = {
                      key: [projectlist[i].Name],
                      values: [],
                      type: "area",
                      yAxis: 1
                    }

      $scope.storageList[projectlist[i].Project_Name].push([tempObj])

      // $scope.storageList[projectlist[i].Project_Name][projectlist[i].Name] =
      //   {
      //     Type: projectlist[i].Type_ID,
      //     Metrics: []
      //   }
    }
    // console.log("storageList: ", $scope.storageList);
  })

  $scope.setSelectedProject = function(project){
    console.log('Setting project: ', project);
    $scope.selectedProject = project;
    // $scope.$on("REFRESH", "monitorGraphs@monitor");
  }

  $scope.getSelectedProjectMetrics = function(){
    // if ($scope.selectedProject === undefined) {
    //   console.log('setting default project....');
    //   $scope.selectedProject = 'Project 1';
    // }
    // console.log('Selecting project: ', $stateParams.project);
    return $scope.storageList[$stateParams.project];
    // return $scope.storageList[$scope.selectedProject];
  };


  MetricService.on(function (data) {
    var index = 0;

    // console.log("stateParams: ", $stateParams.project);
    // console.log("MetricService Data: ", data);

    for (var prop in data.Data_Stores) {
      var dataStoreProject = data.Data_Stores[prop].Project_Name;
      var dataStoreKey = data.Data_Stores[prop].Name;
      var dataStoreMetrics = []

      for (var i = 0; i < data.Data_Stores[prop].Metrics.length; i++) {
        dataStoreMetrics.push({
          "x": new Date(data.Data_Stores[prop].Metrics[i].Date_Time),
          "y": data.Data_Stores[prop].Metrics[i].Store_Depth
        })
      }

      // loop through to find this data item in our storage to  update it
      // var foundIt = false;

      for (var i = 0; i < $scope.storageList[dataStoreProject].length; i++) {

// console.log($scope.storageList[dataStoreProject]);
// console.log($scope.storageList[dataStoreProject][i][0].key + " / " + dataStoreKey);
// console.log($scope.storageList[dataStoreProject][i][0].key == dataStoreKey);

        if ($scope.storageList[dataStoreProject][i][0].key == dataStoreKey) {
          $scope.storageList[dataStoreProject][i][0].values = $scope.storageList[dataStoreProject][i][0].values.concat(dataStoreMetrics)

          // console.log("Found Updates: ", $scope.storageList[dataStoreProject]);
          // foundIt = true
        }
      }

      // if (!foundIt) {
      //   var tempObj = {
      //                   key: dataStoreKey,
      //                   values: dataStoreMetrics,
      //                   type: "area",
      //                   yAxis: 1
      //                 }
      //
      //   $scope.storageList.push([tempObj])
      // }
    }
    // console.log("storageList: ", $scope.storageList);
    $scope.$apply()
  });

  ProjectServices.Get_Projects().then(function(results){
    $scope.projects = results;
  });




  /* Chart options */
  // $scope.options = {
  //   chart: {
  //     type: 'cumulativeLineChart',
  //     height: 300,
  //     margin : {
  //         top: 20,
  //         right: 20,
  //         bottom: 50,
  //         left: 65
  //     },
  //     x: function(d){ return d[0]; },
  //     y: function(d){ return d[1]; },
  //     // y: function(d){ return d[1]/100; },
  //     // average: function(d) { return d.mean/100; },
  //
  //     color: d3.scale.category10().range(),
  //     duration: 300,
  //     useInteractiveGuideline: false,
  //     clipVoronoi: false,
  //
  //     xAxis: {
  //         // axisLabel: 'X Axis',
  //         tickFormat: function(d) {
  //             return d3.time.format('%I:%m:%S %p')(new Date(d))
  //         },
  //         showMaxMin: false,
  //         staggerLabels: true
  //     },
  //
  //     yAxis: {
  //         // axisLabel: 'Y Axis',
  //         tickFormat: function(d){
  //           return d;
  //             // return d3.format(',.1%')(d);
  //         },
  //         axisLabelDistance: 0
  //     }
  //   }
  // };


  // Multi-chart
  $scope.options = {
      chart: {
          type: 'multiChart',
          height: 300,
          margin : {
              top: 30,
              right: 60,
              bottom: 50,
              left: 70
          },
          color: d3.scale.category10().range(),
          //useInteractiveGuideline: true,
          duration: 500,
          xAxis: {
              tickFormat: function(d){
                return d3.time.format('%I:%m:%S %p')(new Date(d));
                // return d3.format(',f')(d);
              }
          },
          yAxis1: {
              tickFormat: function(d){
                return (d);
                // return d3.format(',.1f')(d);
              }
          },
          // yAxis2: {
          //     tickFormat: function(d){
          //         return d3.format(',.1f')(d);
          //     }
          // }
      }
  };


}
