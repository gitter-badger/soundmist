angular.module('soundmist', ['ngRoute']);

angular.module('soundmist').config($routeProvider => {
  $routeProvider
    .when('/', {
      templateUrl: 'components/feed/feed.html',
      controller: 'feed'
    })
    .otherwise({
      redirectTo: '/'
    });
});
