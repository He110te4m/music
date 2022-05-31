import { type BrowserWindow } from 'electron'
import { ipcMain } from 'electron-better-ipc'
import { MessageType } from 'common/enums/event'
import * as log from 'electron-log'

const ipcLog = log.scope('ipc-window')

/** 处理窗口相关 IPC 事件 */
export function useWindowIPC(window: BrowserWindow) {
  ipcMain.on(MessageType.miniWindow, () => {
    ipcLog.debug('最小化窗口')
    window.minimize()
  })

  ipcMain.answerRenderer(MessageType.maxWindow, () => {
    if (window.isMaximized()) {
      ipcLog.debug('还原窗口大小')
      window.restore()
    } else {
      ipcLog.debug('最大化窗口')
      window.maximize()
    }
    return window.isMaximized()
  })

  ipcMain.on(MessageType.closeWindow, () => {
    ipcLog.debug('关闭窗口')
    window.close()
  })
}
