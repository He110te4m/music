import { ipcMain } from 'electron-better-ipc'
import { MessageType } from 'common/enums/event'
import * as log from 'electron-log'
import { playlistHandler } from '@/modules/playlist'
import type { Playlist } from 'common/types/playlist'

const ipcLog = log.scope('ipc-playlist')

export function usePlaylistIPC() {
  ipcMain.answerRenderer(MessageType.getPlaylist, () => {
    ipcLog.debug('获取播放列表')

    return playlistHandler.get()
  })

  ipcMain.answerRenderer(MessageType.createPlaylist, (title: string) => {
    ipcLog.debug(`创建播放列表 ${title}`)

    playlistHandler.add(title)

    return true
  })

  ipcMain.answerRenderer(MessageType.deletePlaylist, (id: string) => {
    ipcLog.debug(`删除播放列表 ${id}`)

    playlistHandler.delete(id)

    return true
  })

  ipcMain.answerRenderer(MessageType.renamePlaylist, (playlist: Playlist) => {
    ipcLog.debug(`重命名播放列表 ${playlist.id}`)

    playlistHandler.rename(playlist)

    return true
  })
}
