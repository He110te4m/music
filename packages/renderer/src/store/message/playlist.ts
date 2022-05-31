import { MessageType } from 'common/enums/event'
import { defineStore } from 'pinia'
import { STORT_ID_PREFIX } from '../_utils'
import type { Playlist } from 'common/types/playlist'

export const usePlaylistMessageStore = defineStore(`${STORT_ID_PREFIX}message-playlist`, {
  actions: {
    getPlaylist () {
      return window.sendMessage(MessageType.getPlaylist) as Playlist[]
    },
    createPlaylist (name: string) {
      return window.sendMessage(MessageType.createPlaylist, name)
    },
    deletePlaylist (id: string) {
      return window.sendMessage(MessageType.deletePlaylist, id)
    },
    renamePlaylist (playlist: Playlist) {
      return window.sendMessage(MessageType.renamePlaylist, playlist)
    }
  }
})
