import { ipcRenderer } from 'electron'
import { exposeInMainWorld } from './exposeInMainWorld'

export enum MessageType {
  miniWindow,
  maxWindow,
  closeWindow,
}

export const messageMap: Record<MessageType, () => void> = {
  [MessageType.miniWindow]: () => {
    ipcRenderer.send('mini-window')
  },
  [MessageType.maxWindow]: () => {
    ipcRenderer.send('max-window')
  },
  [MessageType.closeWindow]: () => {
    ipcRenderer.send('close-window')
  }
}

exposeInMainWorld('sendMessage', (message: MessageType) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const fn = messageMap[message] ?? (() => {})
  console.log(fn)
  fn()
})
