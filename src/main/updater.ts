import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

class Updater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

export default Updater