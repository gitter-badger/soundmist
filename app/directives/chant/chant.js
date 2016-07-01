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



      class Waveform {
        constructor (sample) {
          this.canvas   = element.find('canvas')[0]
          this.context  = this.canvas.getContext("2d")
          this.parent   = this.canvas.parentElement
          this.sample   = sample

          this.canvas.addEventListener('mousemove', event => {
            this.draw(event.offsetX)
          }, false)

          this.canvas.addEventListener('mouseleave', event => {
            this.draw(false)
          }, false)

          this.draw()
        }

        draw (hoverPosition) {
          this.canvas.style.display = 'none'

          let width = this.parent.offsetWidth
          let height = this.parent.offsetHeight

          this.canvas.style.width   = width + 'px'
          this.canvas.style.height  = height + 'px'
          this.canvas.width         = width
          this.canvas.height        = height

          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

          // Normalize height
          let samples_max = Math.max.apply(Math, this.sample)
          let ratio = height / samples_max

          for (var i = 0; i < width; i++) {
            let offset = Math.round((this.sample.length / width) * i * 3)

            if (hoverPosition && i * 3 < hoverPosition) {
              this.context.fillStyle = "#ff6a20"
            } else {
              this.context.fillStyle = "#d4d4d4"
            }

            this.context.fillRect(i * 3, height, 2, -this.sample[offset] * ratio)
          }

          this.canvas.style.display = 'block'
        }

        click () {

        }
      }

      $http.get(scope.item.track.waveform_url).then(data => {
        let samples = data.data.samples

        let waveform = new Waveform(samples)
        waveform.draw()

        $rootScope.$on('CHANT_WAVEFORM_RESIZE', event => {
          waveform.draw()
        })

      })
    }
  }
})
