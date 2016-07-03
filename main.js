'use strict'

const electron = require('electron')
var auth = require('./auth')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let window

app.on('ready', () => {
  auth(token => {
    global.token = token;

    window = new BrowserWindow({
      width: 1000, height: 800
    })

    window.setMenu(null)
    window.loadURL(`file://${__dirname}/app/index.html`)
    window.webContents.openDevTools()
    window.on('closed', () => {
      window = null
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})
