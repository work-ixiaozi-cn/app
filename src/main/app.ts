import { app, ipcMain, nativeTheme } from "electron";
import ShortCut from "./shortcut";
import SysTray from "./tray";
import { isDebug, isProd } from "./util";
import MainWindow from "./windows/MainWindow";
import PlugWindow from "./windows/PlugWindow";


class Application {
    constructor(){
        isProd() && require('source-map-support')?.install()
        isDebug() && require('electron-debug')()
        nativeTheme.themeSource = 'system'

        app.on('ready', this.ready)
        app.on('activate', this.activate)
    }
    private ready(){
        new MainWindow()
        new PlugWindow()
        new SysTray()
        new ShortCut()
    }
    private activate() {
        new MainWindow()
        new PlugWindow()
        new SysTray()
        new ShortCut()
    }
    private ipc(){
        
    }
}

export default Application;