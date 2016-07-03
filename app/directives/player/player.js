angular.module('soundmist').directive('player', function (Player) {
  return {
    restrict: 'E',
    scope: false,
    replace: false,
    templateUrl: 'directives/player/player.html',
    link: function (scope, element) {
      scope.Player = Player
      let slider = angular.element(document.querySelector('#progress'))[0]
      let blocking = false

      scope.$watch('Player.getActive()', function (item) {
        if (item == undefined) return
        scope.item = item

        // Use the high-res artwork instead of the downscaled one provided
        var url = item.track.artwork_url.replace('large.jpg', 't500x500.jpg')
        scope.wallpaper = {
          'background': 'linear-gradient(rgba(255, 126, 0, 0.90),rgba(255, 119, 0, 0.75)), url(' + url + ')'
        }
      })

      scope.$watch('Player.getProgress(item)', function (progress) {
        if (!blocking) scope.progress = progress * 1000
      })

      slider.addEventListener('mousedown', event => {
        blocking = true
      })

      slider.addEventListener('mouseup', function (event) {
        if (blocking) {
          let x = event.pageX - this.offsetLeft
          let progress = x / slider.offsetWidth

          Player.setProgress(scope.item, progress)

          blocking = false
        }
      })
    }
  }
})
