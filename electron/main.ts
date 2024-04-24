import { app, BrowserWindow, ipcMain, Menu, Notification, Tray } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
// import openAboutWindow from "about-window";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    width: 300,
    height: 120,
    frame: false,
    resizable: false,
    transparent: true,
    maximizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.mjs"),
    },
  });
  const iconPath = VITE_DEV_SERVER_URL ?  path.join(process.env.VITE_PUBLIC, "../icon.ico") :   path.join(process.env.VITE_PUBLIC, "../dist/icon.ico")

  // 创建系统托盘图标
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    // {
    //   label: "关于",
    //   click: () => {
    //     openAboutWindow({
    //       product_name: "倒计时",
    //       icon_path: iconPath,
    //       // package_json_dir: path.resolve(__dirname, "../node_modules/about-window"),
    //       about_page_dir: path.resolve(__dirname, "../node_modules/about-window"),
    //       copyright: "Copyright (c) 2023 Mg",
    //       homepage: "https://github.com/yyong008",

    //     });
    //   },
    // },
    {
      label: "显示应用程序",
      click: () => {
        if (win) {
          win.show();
        }
      },
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("CountDown(By Mg)");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    if (win) {
      win.show();
    }
  });

  win.setAlwaysOnTop(true);
  // win.webContents.openDevTools()

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  initIPCMain()
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

function initIPCMain() {
  ipcMain.handle("notification-countdown-completed", function() {
    const notification = new Notification({
      title: "CountDown",
      body: "CountDown time Completed"
    })
    notification.show()
  })

  ipcMain.handle('system-window-close', function() {
    app.quit()
  })

  ipcMain.handle('system-window-small', function() {
    win?.minimize()
  })
}
