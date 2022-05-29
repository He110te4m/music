import { type BrowserWindow } from 'electron'
import { ipcMain } from 'electron-better-ipc'
import { MessageType } from 'common/enums/event'

export function useIPC(window: BrowserWindow) {
  ipcMain.on(MessageType.miniWindow, () => {
    console.debug('进行最小化窗口')
    window.minimize()
  })

  ipcMain.answerRenderer(MessageType.maxWindow, () => {
    if (window.isMaximized()) {
      window.restore()
    } else {
      window.maximize()
    }
    return window.isMaximized()
  })

  ipcMain.on(MessageType.closeWindow, () => {
    window.close()
  })
}
