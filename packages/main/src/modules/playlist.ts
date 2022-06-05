import { configuration } from '@/configuration'
import { ConfigKey } from '@/enums/config'
import type { Playlist } from 'common/types/playlist'
import log from 'electron-log'
import * as crypto from 'crypto'

/** 播放列表模块的日志 */
const playlistLog = log.scope('playlist')

/** 最多存在多少播放列表 */
const maxPlaylist = 20

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
    if (this.list.some(item => item.title === title)) {
      const msg = `创建播放列表 ${title} 失败，已存在同名播放列表`
      playlistLog.warn(msg)
      return msg
    }

    if (this.list.length >= maxPlaylist) {
      const msg = `创建播放列表 ${title} 失败，播放列表数量已达上限 ${maxPlaylist} 条`
      playlistLog.warn(msg)
      return msg
    }

    const id = crypto.randomUUID()
    this.list.push({
      id,
      title
    })

    playlistLog.log(`创建播放列表 ${title} 成功`)

    return true
  }

  delete(id: string) {
    if (this.list.length < 2) {
      const msg = `删除播放列表 ${id} 失败，只有最后一个播放列表时不可删除`
      playlistLog.warn(msg)
      return msg
    }

    this.list = this.list.filter(item => item.id !== id)

    playlistLog.log(`删除播放列表 ${id} 成功`)

    return true
  }

  rename(playlist: Playlist) {
    const idx = this.list.findIndex(({ id }) => playlist.id === id)
    if (!idx) {
      const msg = `重命名播放列表 ${playlist.id} 不存在`
      playlistLog.warn(msg)
      return msg
    }

    const { title: oldTitle } = this.list[idx]

    if (this.list.some(item => item.id !== playlist.id && item.title === playlist.title)) {
      const msg = `重命名播放列表 ${oldTitle} 为 ${playlist.title} 失败，已存在同名播放列表`
      playlistLog.warn(msg)
      return msg
    }

    this.list[idx].title = playlist.title
    playlistLog.log(`重命名 ${oldTitle} 为 ${playlist.title}`)

    return true
  }

  store() {
    configuration.set(ConfigKey.playlist, this.list)
    playlistLog.log('写入配置', this.list)
  }
}

export const playlistHandler = new PlaylistHandler(configuration.get(ConfigKey.playlist) ?? [])
