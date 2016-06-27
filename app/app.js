angular.module('soundmist', ['ui.router', 'ngMaterial', 'ngAnimate']);

angular.module('soundmist').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/stream')

  $stateProvider
    .state('stream', {
      url: '/stream',
      templateUrl: 'components/stream/stream.html',
      controller: 'stream'
    })
    .state('charts', {
      url: '/charts',
      templateUrl: 'components/charts/charts.html',
      controller: 'charts'
    })
});

angular.module('soundmist').run(function ($rootScope, Handler) {
  //$rootScope.isLoaded = Handler.isLoaded
  $rootScope.Handler = Handler
})
