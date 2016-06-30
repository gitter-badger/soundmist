angular.module('soundmist').directive('chant', function ($http, $rootScope) {
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
      scope.item.track.artwork_url_larger = url.replace('large.jpg', 't500x500.jpg')


      let canvas = element.find('canvas')[0]
      let context = canvas.getContext("2d")
      context.fillStyle = "#FAFAFA"
      let parent = canvas.parentElement

      var draw_canvas = function (data) {
        canvas.style.display = 'none'

        let width = parent.offsetWidth
        let height = parent.offsetHeight

        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        canvas.width = width
        canvas.height = height

        context.clearRect(0, 0, canvas.width, canvas.height)

        // Normalize height
        let samples_max = Math.max.apply(Math, data)
        let ratio = height / samples_max

        for (var i = 0; i < width; i++) {
          let offset = Math.round((data.length / width) * i * 3)

          /*let total = [-2, -1, 0, 1, 2].map(index => {
            if (data[offset + index] == undefined) return 0
            return data[offset + index]
          })

          let point = total.reduce((a, b) => a + b, 0) / 5
*/
          context.fillRect(i * 3, height, 2, -data[offset] * ratio)
        }

        //context.translate(0.5, 0.5);
        canvas.style.display = 'block'
      }

      $http.get(scope.item.track.waveform_url).then(data => {
        let waveform_data = data.data.samples
        draw_canvas(waveform_data)

        $rootScope.$on('CHANT_WAVEFORM_RESIZE', event => {
          draw_canvas(waveform_data)
        })

      })
    }
  }
})
