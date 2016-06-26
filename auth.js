const electron = require('electron')
const storage = require('electron-json-storage')
const request = require('request')
const express = require('express')
const BrowserWindow = electron.BrowserWindow

let mainWindow, authWindow
let server = express();

module.exports = function (windowRef) {
  mainWindow = windowRef;

  electron.ipcMain.on('authenticate', function () {
    getToken(token => mainWindow.webContents.send('token', token))
  });
};

function getToken (callback) {
  storage.get('token', function (error, token) {
    let isEmpty = Object.keys(token).length === 0;
    if (error || isEmpty) {
      getNewToken(callback)
    } else {
      callback(token) // check if still valid?
    }
  })
}

function getNewToken (callback) {
  server.get('/defeerer', function (req, res) {
    let token = req.param('access_token')

    storage.set('token', token, function (error) {
      if (error) throw error
    })

    callback(token)

    authWindow.close()
    server.close();
  })

  server.listen(48770)

  request('http://localhost:3000', (error, response, body) => {
    if (!response || error) throw error

    // Open up a new Electron window for SC authentication
    var url = response.request.href
    authWindow = new BrowserWindow({
      width: 800, height: 800
    })

    authWindow.loadURL(url)
  })
}
