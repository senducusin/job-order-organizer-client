const path = require("path");
const pouchDB = require("pouchdb");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const isDev = require("electron-is-dev");

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true, // is default value after Electron v5
      worldSafeExecuteJavaScript: true,
      contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const saveBackup = (content) => {
  dialog
    .showSaveDialog({
      title: "Select the file path to save",
      defaultPath: path.join(__dirname, "../assets/backup.json"),
      buttonLabel: "Save",
      filters: [{ name: "JSON Files", extensions: ["json"] }],
      properties: [],
    })
    .then((file) => {
      console.log(file.canceled);
      if (!file.canceled) {
        console.log(file.filePath.toString());

        fs.writeFile(
          file.filePath.toString(),
          JSON.stringify(content),
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const restoreBackup = () => {
  dialog.showOpenDialog({ properties: ["openFile"] }).then((response) => {
    if (!response.canceled) {
      fs.readFile(response.filePaths[0], "utf-8", (err, data) => {
        if (err) {
          console.log("An error ocurred reading the file :" + err.message);
          return;
        }

        win.webContents.send("fromMain", { mode: "restore", content: data });
      });
    } else {
      console.log("no file selected");
    }
  });
};

ipcMain.on("toMain", (event, args) => {
  switch (args.mode) {
    case "import":
      restoreBackup();
      break;
    case "export":
      saveBackup(args.content);
      break;
  }
});
