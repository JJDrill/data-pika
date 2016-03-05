angular.module('DataNexus', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    console.log("Hello from Angular")

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing', {
      templateUrl: 'templates/landing.html',
      controller: 'LandingController',
      url: '/'
    })

    $stateProvider.state('configure', {
      templateUrl: 'templates/configure.html',
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
