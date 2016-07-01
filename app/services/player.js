'use strict'

angular.module('soundmist').service('Player', class {
  constructor ($http, ngAudio, API) {
    this.Audio = ngAudio
    this.API = API

    this.Player = null
    this.currentItem = null
    this.paused = false
    // this.sound = ngAudio.load('path/to/file.mp3')
  }

  play (item) {
    if (item === this.currentItem && !this.isPlaying(item)) {
      this.Player.play()
    } else {
      this.currentItem = item

      if (this.Player) {
        this.Player.stop()
      }

      this.Player = this.Audio.load(this.API.getStreamURL(item))
      this.Player.play()
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
