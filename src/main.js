'use strict';
const Electron = require('electron');

Electron.app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    Electron.app.quit();
  process.exit();
});

Electron.app.on('ready', function () {
  this.window = new Electron.BrowserWindow({
    width: 800,
    height: 600
  });
  this.window.loadURL('file://' + __dirname + "/Page/index.html");
  this.window.on('closed', function () {
    this.window = null;
  });
  this.window.webContents.openDevTools();
  this.window.setSkipTaskbar = true;
  this.window.setMenuBarVisibility(false);
});