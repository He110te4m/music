import { app, Menu, type BrowserWindow, type Tray } from 'electron'
import type { AdaptBase } from '../../base/adapt'
import { useIPC } from './useIPC'
import { useWindow } from './useWindow'
import * as log from 'electron-log'
import { useWebContentSecurity } from './useWebContentSecurity'

export class Electron implements AdaptBase {
  mainWindow: BrowserWindow | null
  tray: Tray | null

  constructor() {
    this.mainWindow = null
    this.tray = null
  }

  init() {
    if (!this.checkSingleInstance()) {
      app.quit()
      process.exit(0)
    }

    this.initApp()
    this.initEvent()
    this.onReady()
  }

  protected initApp() {
    app.disableHardwareAcceleration()
  }

  protected initEvent() {
    app.on('second-instance', async () => {
      this.mainWindow = await useWindow({
        afterCreatedWin: useIPC
      })
    })
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    app.on('activate', async () => {
      this.mainWindow = await useWindow({
        afterCreatedWin: useIPC
      })
    })
    app.on('web-contents-created', (_, content) => {
      useWebContentSecurity(content)
    })
  }

  protected onReady() {
    app
      .whenReady()
      .then(async () => {
        this.mainWindow = await useWindow({
          afterCreatedWin: useIPC
        })

        // 隐藏菜单栏
        Menu.setApplicationMenu(null)
        if (process.platform !== 'darwin') {
          app.dock?.hide()
        }
      })
      .catch(e => {
        log.error('window 创建失败', e)
      })

    if (import.meta.env.DEV) {
      app
        .whenReady()
        .then(() => import('electron-devtools-installer'))
        .then(({ default: installExtension, VUEJS3_DEVTOOLS }) => {
          installExtension(VUEJS3_DEVTOOLS, {
            loadExtensionOptions: {
              allowFileAccess: true
            }
          })
        })
        .catch(e => {
          log.error('安装 vuejs 扩展失败', e)
        })
    }

    if (import.meta.env.PROD) {
      app
        .whenReady()
        .then(() => import('electron-updater'))
        .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
        .catch(e => {
          log.error('检查更新失败', e)
        })
    }
  }

  protected checkSingleInstance() {
    return app.requestSingleInstanceLock()
  }
}
