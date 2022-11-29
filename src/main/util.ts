/* eslint import/prefer-default-export: off */
import { URL } from 'url'
import path from 'path'
import { app } from 'electron'

export const isDebug = () => process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
export const isProd = () => process.env.NODE_ENV === 'production'

export const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212
    const url = new URL(`http://localhost:${port}`)
    // url.pathname = htmlFileName
    url.hash = htmlFileName
    return url.href
  }
  return `file://${path.resolve(__dirname, '../renderer/index.html')}#${htmlFileName}`
}

export const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
}

export const getAssetPath = (...paths: string[]): string => {
  return path.join(
    path.join(process.resourcesPath, app.isPackaged ? 'assets' : '../../assets'), 
    ...paths
  )
}