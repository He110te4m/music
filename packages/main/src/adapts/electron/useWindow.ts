import { BrowserWindow } from 'electron'
import { join } from 'path'
import * as log from 'electron-log'

interface WindowOptions {
  afterCreatedWin?: (win: BrowserWindow) => void
}

export async function useWindow(options: WindowOptions) {
  let window = BrowserWindow.getAllWindows().find(win => !win.isDestroyed())
  if (!window) {
    window = await createWindow(options)
  }

  if (window.isMaximized()) {
    window.restore()
  }

  window.focus()

  return window
}

async function createWindow({ afterCreatedWin }: WindowOptions) {
  const win = new BrowserWindow({
    show: false, // 等 ready-to-show 事件触发再显示窗口
    frame: false, // 关闭外框
    titleBarStyle: 'hidden', // 隐藏工具菜单
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false,
      preload: join(__dirname, '../../preload/dist/index.cjs')
    }
  })

  initWindowEvent(win)
  afterCreatedWin?.(win)

  const url = getPageURL()

  log.debug(`window url: ${url}`)

  await win.loadURL(url)

  return win
}

function initWindowEvent(win: BrowserWindow) {
  win.on('ready-to-show', () => {
    win.show()

    if (import.meta.env.DEV) {
      win.webContents.openDevTools()
    }
  })
}

function getPageURL() {
  return import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()
}
