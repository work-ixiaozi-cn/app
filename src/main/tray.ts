import { app, Menu, Tray } from "electron"
import MainWindow from "./windows/MainWindow";

class SysTray {
    public static instance: Tray;
    constructor(){
        if(!SysTray.instance){
            SysTray.instance = new Tray('assets/icon.png')
            SysTray.instance.setToolTip('this is my app')
            SysTray.instance.setContextMenu(Menu.buildFromTemplate(this.menu()))
        }

    }
    private menu(): (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] {
        return [
            {
                label: '显示主窗口',
                type: 'normal',
                click: this.mainWindowShow
            },{
                label: '重启',
                click: this.appRelaunch
            },{
                label: '退出',
                click: this.appExit
            }
        ]
    }

    private mainWindowShow(){
        MainWindow.instance.show()
    }
    private appRelaunch(){
        app.relaunch()
    }
    private appExit(){
        app.exit()
    }
}

export default SysTray