import { app, BrowserWindow, ipcMain, shell } from "electron";
import { getAssetPath, resolveHtmlPath } from "../util";
import path from "path";
import contextMenu from "electron-context-menu";
import fs from 'fs'

class MainWindow {
  public static instance: BrowserWindow
  public static inject: string

  constructor(){
    if (!MainWindow.instance) {
      MainWindow.instance = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        useContentSize: true,
        frame: false,
        webPreferences: {
          devTools: true,
          preload: path.join(__dirname, app.isPackaged ? 'preload.js' : '../../../.erb/dll/main.preload.js'),
        },
      })
      MainWindow.inject = fs.readFileSync(path.join(__dirname, '../../../.erb/dll/inject.js')).toString()
      MainWindow.instance.webContents.openDevTools()
      MainWindow.instance.webContents.loadURL(resolveHtmlPath('/main'))
      MainWindow.instance.setBackgroundColor("rgba('0,0,0,0)")
      MainWindow.instance.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
      })
      MainWindow.instance.webContents.setWebRTCIPHandlingPolicy('default_public_and_private_interfaces')
      contextMenu({window: MainWindow.instance})
        
      MainWindow.instance.on('ready-to-show', this.readyToShow)
      MainWindow.instance.webContents.on('did-finish-load', this.webContentsDidFinishLoad)
    //     const menuBuilder = new MenuBuilder(mainWindow);
    // menuBuilder.buildMenu();

    // // Open urls in the user's browser
    MainWindow.instance.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
      })
    }
    ipcMain.on('MainWindow/minimize', () => MainWindow.instance.minimize())
    ipcMain.on('MainWindow/maximize', () => MainWindow.instance.maximize())
    ipcMain.on('MainWindow/restore', () => MainWindow.instance.restore())
    ipcMain.handle('MainWindow/isMaximized', () => {
      console.log(MainWindow.instance.isMaximized());
      return MainWindow.instance.isMaximized()
    })
    // MainWindow.instance.maximize()
  }

  protected readyToShow(){
    console.log('readyToShow');
    
    process.env.START_MINIMIZED
      ? MainWindow.instance.minimize()
      : MainWindow.instance.show()
  }

  protected webContentsDidFinishLoad() {
    MainWindow.instance.webContents.executeJavaScript("var global = global || window;");
    MainWindow.instance.webContents.executeJavaScript(MainWindow.inject)
  }
}

export default MainWindow