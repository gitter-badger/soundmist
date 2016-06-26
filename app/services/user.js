var ipc = require('electron').ipcRenderer

angular.module('soundmist').service('UserService', function () {
  ipc.send('authenticate');

  ipc.on('token', function(event, token) {
    console.info(token);
  });
})
