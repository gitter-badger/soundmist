'use strict'

angular.module('soundmist').service('API', function ($http, $q) {
  const API_BASE = 'https://api-v2.soundcloud.com/';
  let self = this

  this.getStream = function () {
    let config = {
      method: 'GET',
      url: API_BASE + 'stream',
      params: {
        oauth_token: token,
        limit: 50
      }
    }

    return $http(config)
  }
})
