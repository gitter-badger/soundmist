angular.module('soundmist').directive('sidebar', function () {
  return {
    restrict: 'E',
    scope: false,
    replace: true,
    templateUrl: 'directives/sidebar/sidebar.html',
    controller: controller
  }
})

let controller = function ($scope) {
  
}
