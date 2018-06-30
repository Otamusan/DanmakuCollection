/// <reference types="electron" />
import * as console from 'console';
import Electron = require('electron');
import { Server } from './page/server/Server';
'use strict';
Electron.app.commandLine.appendSwitch('disable-web-security');
Electron.app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    Electron.app.quit();
  process.exit();
});
Electron.app.on('ready', function () {
  this.window = new Electron.BrowserWindow({
    webPreferences: {
      nodeIntegration : true,
      nodeIntegrationInWorker: true
    },
    width: 800,
    height: 600,
    resizable: false
  });
  this.window.loadURL('file://' + __dirname + "/page/index.html");
  this.window.on('closed', function () {
    this.window = null;
  });
  this.window.webContents.openDevTools();
  this.window.setSkipTaskbar = true;
  this.window.setMenuBarVisibility(false);
});