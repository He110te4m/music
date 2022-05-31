import { configuration } from '@/configuration'
import { ConfigKey } from '@/enums/config'
import type { Playlist } from 'common/types/playlist'
import log from 'electron-log'
import * as crypto from 'crypto'

const playlistLog = log.scope('playlist')

class PlaylistHandler {
  private list: Playlist[]

  constructor(list: Playlist[]) {
    this.list = list
  }

  get() {
    playlistLog.log('读取配置中的播放列表: ', this.list)

    return this.list
  }

  add(title: string) {
    const id = crypto.randomUUID()
    this.list.push({
      id,
      title
    })

    playlistLog.log(`创建播放列表 ${title} 成功`)

    return this
  }

  delete(id: string) {
    this.list = this.list.filter(item => item.id !== id)

    playlistLog.log(`删除播放列表 ${id} 成功`)

    return this
  }

  rename(playlist: Playlist) {
    const idx = this.list.findIndex(({ id }) => playlist.id === id)
    if (!idx) {
      playlistLog.warn(`重命名播放列表 ${playlist.id} 不存在`)

      return this
    }

    const { title: oldTitle } = this.list[idx]

    this.list[idx].title = playlist.title
    playlistLog.log(`重命名 ${oldTitle} 为 ${playlist.title}`)

    return this
  }

  store() {
    configuration.set(ConfigKey.playlist, this.list)
    playlistLog.log('写入配置', this.list)

    return this
  }
}

export const playlistHandler = new PlaylistHandler(configuration.get(ConfigKey.playlist) ?? [])
