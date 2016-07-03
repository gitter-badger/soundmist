'use strict'

var ipc = require('electron').ipcRenderer

angular.module('soundmist').service('Handler', function ($http, $q, $window) {
  const baseUrl = 'https://api.soundcloud.com'
  let self = this

  self.isLoaded = false

  let defers = {
    '/me':            $q.defer(),
    '/me/playlists':  $q.defer()
  }

  var promises = Object.keys(defers).map(key => defers[key].promise)
  $q.all(promises).then(data => {
    self.isLoaded = true
    console.log('finished')
  })

  this.fetch = function(endpoint) {
    let request = {
      method: 'GET',
      url: baseUrl + endpoint,
      params: {
        oauth_token: token
      }
    }

    return $http(request).then(data => {

      defers[endpoint].resolve(data.data)
      console.log(defers)

      return data.data
    })
  }
})
