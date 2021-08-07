const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const fetch = require('node-fetch');
const path = require('path');
const fingerprint = require('geektime-fringerprint-example');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'));
  }

  app.on('window-all-closed', () => {
    app.quit();
  });
});

ipcMain.on('fetchRepo', () => {
  fetch('https://api.github.com/users/gnosis23/repos', {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }).then(res => res.json()).then(data => {
    mainWindow.webContents.send('getRepo', data);
  })
});

ipcMain.on('async-message', (event) => {
  event.reply('async-message-reply', [{id: 1}]);
});

ipcMain.on('fingerprint', (event) => {
  event.reply('fingerprint-reply', fingerprint.getFringerprint());
});
