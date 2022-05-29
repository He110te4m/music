import { type BrowserWindow, ipcMain } from 'electron'

export function useIPC(window: BrowserWindow) {
  ipcMain.on('mini-window', () => {
    console.debug('进行最小化窗口')
    window.minimize()
  })

  ipcMain.on('max-window', () => {
    if (window.isMaximized()) {
      window.restore()
    } else {
      window.maximize()
    }
  })

  ipcMain.on('close-window', () => {
    window.close()
  })
}
