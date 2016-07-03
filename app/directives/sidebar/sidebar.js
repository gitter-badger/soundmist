angular.module('soundmist').directive('sidebar', function (API) {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/sidebar/sidebar.html',
    controller: function ($scope, $q, API, Handler) {

      $q.all([
        API.getUser().then(user => $scope.user = user),
        API.getPlaylists().then(playlists => $scope.playlists = playlists),
      ]).then(data => {
        console.info('sidebar loaded')
        Handler.setLoaded()
      })
    }
  }
})
