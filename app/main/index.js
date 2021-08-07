const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const fetch = require('node-fetch');
const path = require('path');
const sqlite = require('sqlite3');

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

// sqlite test
const database = new sqlite.Database(path.join(app.getPath('userData'), 'bookmarks.sqlite'), err => {
  if (err) console.error('Database opening error: ', err);
});

database.serialize(function() {
    database.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT);\n")
    database.run("INSERT INTO messages values (1);\n", [], err => {
      console.error(err);
    });
});

ipcMain.on('async-message', (event, arg) => {
  const sql = 'select * from messages';
  database.all(sql, (err, rows) => {
    console.log(err, rows);
    event.reply('async-message-reply', err || rows);
  });
});
