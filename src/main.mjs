'use strict';
const Electron = require('electron');
//import Electron from 'electron'


class Main {
  static init() {
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
      this.window.loadURL('file://' + __dirname + "/index.html");
      this.window.on('closed', function () {
        this.window = null;
      });
      this.window.setSkipTaskbar = true;
      this.window.setMenuBarVisibility(false);
    });

    Electron.app.on('activate', function () {
      
    });

    this.instance = new Main;
  }

  static getWindow() {
    return this.window;
  }

  static getInstance(){
    return this.instance;
  }
}

Main.init();