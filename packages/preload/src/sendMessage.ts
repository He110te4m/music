import { ipcRenderer } from 'electron-better-ipc'
import { exposeInMainWorld } from '@/exposeInMainWorld'
import { MessageType } from 'common/enums/event'
import * as log from 'electron-log'

const messageMap = {
  [MessageType.miniWindow]: () => {
    ipcRenderer.send('mini-window')
  },
  [MessageType.maxWindow]: () => {
    return ipcRenderer.callMain<void, boolean>('max-window')
  },
  [MessageType.closeWindow]: () => {
    ipcRenderer.send('close-window')
  }
} as const

export type MessageMap = typeof messageMap

exposeInMainWorld('sendMessage', (message: MessageType) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const fn = messageMap[message] ?? (() => {})
  log.debug(`发送 IPC 信息: ${message}`)
  return fn()
})
