angular.module('soundmist').directive('player', function (Player) {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/player/player.html',
    link: function (scope) {
      scope.Player = Player
    },
    controller: function ($scope, Handler) {
      console.log('hello world')
    }

  }
})
