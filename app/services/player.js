'use strict'

angular.module('soundmist').service('Player', class {
  constructor ($rootScope, $http, ngAudio, API) {
    this.rootScope = $rootScope
    this.Audio = ngAudio
    this.API = API

    this.Player = null
    this.currentItem = null
    this.paused = false
  }

  play (item) {
    if (item === undefined) {
      this.Player.play()
      this.paused = false
      return
    }

    if (item === this.currentItem && !this.isPlaying(item)) {
      this.Player.play()
    } else {
      this.currentItem = item

      if (this.Player) {
        this.Player.stop()
      }

      this.Player = this.Audio.load(this.API.getStreamURL(item))
      this.Player.play()

      this.rootScope.$emit('SHOW_HEADER')
    }

    this.paused = false
  }

  pause (item) {
    if (this.Player) {
      this.Player.pause()
      this.paused = true
    }
  }

  isActive (item) {
    return item === this.currentItem
  }

  getActive () {
    return this.currentItem
  }

  isPlaying (item) {
    return this.isActive(item) && this.paused === false
  }

  setProgress (item, progress) {
    if (this.isActive (item)) {
      this.Player.setProgress(progress)
    }
  }

  getProgress (item) {
    if (item !== this.currentItem) return 0
    return this.Player.progress || 0
  }

})
