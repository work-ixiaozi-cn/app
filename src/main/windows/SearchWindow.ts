import { app, BrowserView, BrowserViewConstructorOptions, BrowserWindow, BrowserWindowConstructorOptions, desktopCapturer, ipcMain, Rectangle, shell } from "electron";
import { getAssetPath, resolveHtmlPath } from "../util";
import path from "path";
import contextMenu from "electron-context-menu";

class SearchWindow {
  public static instance: BrowserWindow
  constructor(){
    if (!SearchWindow.instance) {
      SearchWindow.instance = new BrowserWindow({
        show: true,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        useContentSize: true,
        frame: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
          devTools: true,
          preload: path.join(__dirname, app.isPackaged ? '' : '../../.erb/dll', 'search.preload.js'),
        },
      })
    
      SearchWindow.instance.webContents.openDevTools()
      SearchWindow.instance.webContents.loadURL(resolveHtmlPath('/search'))
      SearchWindow.instance.setBackgroundColor("rgba('0,0,0,0)")

      contextMenu({window: SearchWindow.instance})
      this.resize()
        
      SearchWindow.instance.on('ready-to-show', this.readyToShow)
      SearchWindow.instance.on('resize', this.resize)
      SearchWindow.instance.webContents.on('did-finish-load', this.webContentsDidFinishLoad)
    //     const menuBuilder = new MenuBuilder(SearchWindow);
    // menuBuilder.buildMenu();

    // // Open urls in the user's browser
    SearchWindow.instance.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
      })

    }
    ipcMain.on('SearchWindow/minimize', () => SearchWindow.instance.minimize())
    ipcMain.on('SearchWindow/maximize', () => SearchWindow.instance.maximize())
    ipcMain.on('SearchWindow/restore', () => SearchWindow.instance.restore())
    // SearchWindow.instance.maximize()
  }

  protected readyToShow(){
    process.env.START_MINIMIZED
      ? SearchWindow.instance.minimize()
      : SearchWindow.instance.show()
  }

  protected resize() {
    const rect = SearchWindow.instance.getBounds()
  }

  protected webContentsDidFinishLoad() {
    // this.webContents.executeJavaScript("document.querySelector('#root').style.marginTop = '48px'")
  }
}

export default SearchWindow