import { app, BrowserView, BrowserViewConstructorOptions, BrowserWindow, BrowserWindowConstructorOptions, desktopCapturer, ipcMain, Rectangle, shell } from "electron";
import { getAssetPath, resolveHtmlPath } from "../util";
import path from "path";
import contextMenu from "electron-context-menu";
import PlugView from "./PlugView";

class PlugWindow {
  public static instance: BrowserWindow
  constructor(){
    if (!PlugWindow.instance) {
      PlugWindow.instance = new BrowserWindow({
        show: true,
        width: 800,
        height: 60,
        icon: getAssetPath('icon.png'),
        useContentSize: true,
        frame: false,
        webPreferences: {
          devTools: true,
          // preload: path.join(__dirname, app.isPackaged ? 'preload.js' : '../../.erb/dll/preload.js'),
        },
      })
    
      PlugWindow.instance.webContents.openDevTools()
      PlugWindow.instance.webContents.loadURL(resolveHtmlPath('/search'))
      PlugWindow.instance.setBackgroundColor("rgba('0,0,0,0)")

      contextMenu({window: PlugWindow.instance})
      new PlugView()
      PlugWindow.instance.addBrowserView(PlugView.instance)
        
      PlugWindow.instance.on('ready-to-show', this.readyToShow)
      PlugWindow.instance.on('resize', this.resize)
      PlugWindow.instance.webContents.on('did-finish-load', this.webContentsDidFinishLoad)
    //     const menuBuilder = new MenuBuilder(PlugWindow);
    // menuBuilder.buildMenu();

    // // Open urls in the user's browser
    PlugWindow.instance.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
      })
    }
  }

  protected readyToShow(){
    process.env.START_MINIMIZED
      ? PlugWindow.instance.minimize()
      : PlugWindow.instance.show()
  }

  protected resize() {
    const rect = PlugWindow.instance.getBounds()
  }

  protected webContentsDidFinishLoad() {
    // this.resize()
    // this.webContents.executeJavaScript("document.querySelector('#root').style.marginTop = '48px'")
  }
}

export default PlugWindow