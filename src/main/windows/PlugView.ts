import {
  app,
  BrowserView,
  ipcMain,
  Rectangle,
  shell
} from "electron"
import contextMenu from 'electron-context-menu'
import path from "path"
import { resolveHtmlPath } from "../util"


class PlugView {
  public static instance: BrowserView
  constructor(){
    if(!PlugView.instance) {
      PlugView.instance = new BrowserView({
        webPreferences: {
          devTools: false,
          preload: path.join(__dirname, app.isPackaged ? 'main_title_bar.js' : '../../../.erb/dll/main_title_bar.js'),
        }
      })
      PlugView.instance.webContents.loadURL(resolveHtmlPath('/main/title_bar'))
      PlugView.instance.setBackgroundColor("rgba('0,0,0,0)")
      PlugView.instance.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
      })
      ipcMain.on('title_bar', async (event, arg) => {
        const msgTemplate = (pingPong: string) => `[x]title_bar test: ${pingPong}`;
        console.log(msgTemplate(arg));
        event.reply('title_bar', msgTemplate('pong'));
      })
      ipcMain.on('PlugView/actived', (_, state: boolean) => {
        PlugView.instance.setBounds({
          ...PlugView.instance.getBounds(),
          height: state ? 800: 48
        })
      })
    }
    // Object.setPrototypeOf(this, PlugView.prototype)
  }
  
  public static resize(rect: Rectangle) {
  }
}

export default PlugView