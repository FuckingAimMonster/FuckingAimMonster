const { app, BrowserWindow, ipcMain } = require("electron");
// include the Node.js 'path' module at the top of your file
const path = require("path");
const ioHook = require("iohook");
const fs = require("fs");

// modify your existing createWindow() function
function createWindow() {
  let clickTimes = [];
  let mousePosList = [];
  let mousePos = { x: 0, y: 0 };
  let mousePosInterval;
  let mousePosSet = [];
  let ioHookStartTimeout;

  const win = new BrowserWindow({
    width: 1838,
    height: 1006,
    title: "",
    resizable: false,
    icon: "images/target.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
  //win.setMenu(null);

  ioHook.on("mousedown", (e) => {
    ioHook.stop();
    clearInterval(mousePosInterval);
    const reverse = mousePosList.reverse().slice(0, 100).reverse();
    reverse.push("/");
    mousePosSet.push(reverse);
    ioHookStartTimeout = setTimeout(() => {
      ioHook.start();
      mousePosInterval = setInterval(() => {
        mousePosList.push([mousePos.x, mousePos.y]);
      }, 5);
    }, 700);
    mousePosList = [];
    clickTimes.push(Date.now());
  });
  ioHook.on("mousemove", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
  });

  ipcMain.on("calFinish", (event, arg) => {
    win.webContents.send("restart", arg);
  });

  ipcMain.on("startFromApp", (event, arg) => {
    win.webContents.send("startRecord", "now start");
    ioHook.start();
    mousePosInterval = setInterval(() => {
      mousePosList.push([mousePos.x, mousePos.y]);
    }, 5);
  });

  /*
  ipcMain.on("stopFromApp", (event, arg) => {
    mousedpi = arg.mousedpi;
    gamedpi = arg.gamedpi;
    win.webContents.send("stopRecord", {
      mousedpi,
      gamedpi,
    });
  });
  */

  ipcMain.on("stopFromApp", (event, arg) => {
    ioHook.stop();
    clearInterval(ioHookStartTimeout);
    clearInterval(mousePosInterval);
    mousedpi = arg.mousedpi;
    gamedpi = arg.gamedpi;
    win.webContents.send("stopRecord", {
      clickTimes,
      mousePosSet,
      mousedpi,
      gamedpi,
    });
    mousePosList = [];
    mousePosSet = [];
    clickTimes = [];
  });

  ipcMain.on("app quit", () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
