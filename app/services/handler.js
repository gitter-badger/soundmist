'use strict'

var ipc = require('electron').ipcRenderer

angular.module('soundmist').service('Handler', function ($http, $q) {
  const baseUrl = 'https://api.soundcloud.com'
  let self = this
  let q = $q.defer()

  ipc.send('authenticate')
  ipc.on('token', function(event, token) {
    console.info(token)
    self._token = token
    q.resolve(token)
  })

  this.isLoaded = function () {
    return this._token
  }

  this.fetch = function(endpoint) {
    return q.promise.then(token => {
      let request = {
        method: 'GET',
        url: baseUrl + endpoint,
        params: {
          oauth_token: token
        }
      }

      return $http(request).then(data => data.data)
    })
  }
})
