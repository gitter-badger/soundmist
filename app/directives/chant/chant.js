angular.module('soundmist').directive('chant', function () {
  return {
    restrict: 'E',
    scope: {
      item: '=item'
    },
    replace: true,
    transclude: true,
    templateUrl: 'directives/chant/chant.html',
    link: function (scope, element, attrs) {
      if (scope.item.track == undefined) return

      var url = scope.item.track.artwork_url
      console.info(url)
      scope.item.track.artwork_url_larger = url.replace('large.jpg', 't500x500.jpg')
    
    },
    controller: function ($scope) {

    },

  }
})
