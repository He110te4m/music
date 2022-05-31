import { ipcRenderer } from 'electron-better-ipc'
import { exposeInMainWorld } from '@/exposeInMainWorld'
import { MessageType } from 'common/enums/event'
import * as log from 'electron-log'
import type { Playlist } from 'common/types/playlist'

const messageMap = {
  [MessageType.miniWindow]: () => {
    ipcRenderer.send(MessageType.miniWindow)
  },
  [MessageType.maxWindow]: () => {
    return ipcRenderer.callMain<void, boolean>(MessageType.maxWindow)
  },
  [MessageType.closeWindow]: () => {
    ipcRenderer.send(MessageType.closeWindow)
  },
  [MessageType.getPlaylist]: () => {
    return ipcRenderer.callMain<void, Record<'id' | 'title', string>[]>(MessageType.getPlaylist)
  },
  [MessageType.createPlaylist]: (name: string) => {
    return ipcRenderer.callMain<string, boolean>(MessageType.createPlaylist, name)
  },
  [MessageType.deletePlaylist]: (id: string) => {
    return ipcRenderer.callMain<string, boolean>(MessageType.deletePlaylist, id)
  },
  [MessageType.renamePlaylist]: (playlist: Playlist) => {
    return ipcRenderer.callMain<Playlist, boolean>(MessageType.renamePlaylist, playlist)
  }
} as const

export type MessageMap = typeof messageMap

exposeInMainWorld('sendMessage', (message: MessageType, data?: any) => {
  const fn = messageMap[message]
  if (!fn) {
    log.error(`${message} 类型的信息不存在，无法完成响应`)
    return
  }
  log.debug(`发送 IPC 信息: ${message}`)
  return fn(data)
})
