angular.module('soundmist').directive('overlay', function (Handler) {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/overlay/overlay.html',
    controller: function () {

    }
  }
})
