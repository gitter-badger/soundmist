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

  this.getFavorites = function () {
    let deferred = $q.defer();
    let ids = [];

    (function fetch (page) {
      let url = page || 'https://api.soundcloud.com/me/favorites/ids.json'
      let self = this

      let config = {
        method: 'GET',
        url: url,
        params: {
          oauth_token: token,
          linked_partitioning: 1,
          limit: 100
        }
      }

      return $http(config).then(response => {
        let data = response.data;
        if (!data) deferred.reject();

        ids = ids.concat(data.collection)

        if (data.hasOwnProperty('next_href')) {
          return fetch(data.next_href)
        } else {
          deferred.resolve(ids)
        }
      }, response => {
        deferred.reject();
      })
    })()

    return deferred.promise
  }


  this.getStreamURL = function (item) {
    return item.track.uri + '/stream?oauth_token=' + token
  }
})
