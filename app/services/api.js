'use strict'

angular.module('soundmist').service('API', class {
  constructor ($http, $q) {
    this.API_V1 = 'https://api.soundcloud.com/';
    this.API_V2 = 'https://api-v2.soundcloud.com/';
    this.$http = $http;
    this.$q = $q;



    window.cache = {}
    this.getFavorites().then(ids => window.favorites = ids)
  }

  getUser (force) {
    if (cache.user && !force) {
      console.log('got user from cache')
      return cache.user
    }

    let config = {
      method: 'GET',
      url: this.API_V1 + 'me',
      params: {
        oauth_token: token
      }
    }

    return this.$http(config).then(response => {
      return cache.user = response.data
    })
  }

  getPlaylists (force) {
    if (cache.playlists && !force) {
      console.log('got playlists from cache')
      return this.$q.resolve(cache.playlists)
    }

    let config = {
      method: 'GET',
      url: this.API_V1 + 'me/playlists',
      params: {
        oauth_token: token
      }
    }

    return this.$http(config).then(response => {
      return cache.playlists = response.data
    })
  }

  getStream (force) {
    if (cache.stream && !force) {
      console.log('got stream from cache')
      return this.$q.resolve(cache.stream)
    }

    let config = {
      method: 'GET',
      url: this.API_V2 + 'stream',
      params: {
        oauth_token: token,
        limit: 50
      }
    }

    return this.$http(config).then(response => {
      return cache.stream = response.data
    })
  }

  getFavorites () {
    let self = this;
    let deferred = this.$q.defer();
    let ids = [];

    (function fetch (page) {
      let url = page || 'https://api.soundcloud.com/me/favorites/ids.json'

      let config = {
        method: 'GET',
        url: url,
        params: {
          oauth_token: token,
          linked_partitioning: 1,
          limit: 100
        }
      }

      return self.$http(config).then(response => {
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

  isFavorite (item) {
    if ('favorites' in window && item.track) {
      return favorites.indexOf(item.track.id) > -1
    }
  }

  getStreamURL (item) {
    return item.track.uri + '/stream?oauth_token=' + token
  }
})
