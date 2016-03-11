angular.module('DataNexus', ['ui.router', 'nvd3'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing', {
      templateUrl: 'templates/landing.html',
      controller: 'LandingController',
      url: '/'
    })

    $stateProvider.state('configure', {
      views: {
          "": {
            templateUrl: 'templates/configure.html',
            controller: 'ConfigureController',
            // url: '/configure'
          },
          "chart": {
            template: "<h1>TEST!!!!</h1><chart_thing/>"
          }
        },
      // templateUrl: 'templates/configure.html',
      controller: 'ConfigureController',
      url: '/configure'
    })

    $stateProvider.state('security', {
      templateUrl: 'templates/security.html',
      controller: 'SecurityController',
      url: '/security'
    })

    $stateProvider.state('monitor', {
      templateUrl: 'templates/monitor.html',
      controller: 'MonitorController',
      url: '/monitor'
    })
  });
