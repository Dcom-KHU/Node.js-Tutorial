const { app, BrowserWindow } = require("electron");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 300,
    height: 400,
    icon: __dirname + "/src/img/icon.png",
  });
  win.loadURL(`file://${__dirname}/src/index.html`);

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) createWindow();
});
