'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const app = electron.app;

var window = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadURL('file://' + __dirname + "/index.html");
  window.on('closed', function() {
    window = null;
  });
  window.setSkipTaskbar = true;
  window.setMenuBarVisibility(false);
});
