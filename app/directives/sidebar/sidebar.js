angular.module('soundmist').directive('sidebar', function (Handler) {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/sidebar/sidebar.html',
    controller: function ($scope, Handler) {
      Handler.fetch('/me').then(user => {
        $scope.user = user;
        console.warn(user)
      })
    }

  }
})
