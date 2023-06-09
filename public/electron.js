const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
          icon: path.join(__dirname + '/public/assets/icon.ico'),
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3005"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.allowRendererProcessReuse = true;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) app.quit();
else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
    app.on("ready", createWindow);
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  
  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
  

