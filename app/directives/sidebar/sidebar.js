angular.module('soundmist').directive('sidebar', function () {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/sidebar/sidebar.html',
    controller: controller
  }
})

let controller = function ($scope) {
  $scope.isActive = function(route) {
      return ('/' + route) === $location.path();
  }
}
