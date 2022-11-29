import { globalShortcut } from "electron";
import SearchWindow from "./windows/SearchWindow";


class ShortCut {
    constructor(){
        globalShortcut.register('Alt+CommandOrControl+I', this.showSearchWindow)
    }
    private showSearchWindow(){
        SearchWindow.instance.hide()
    }
}

export default ShortCut