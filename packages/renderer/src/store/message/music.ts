import { MessageType } from 'common/enums/event'
import type { Playlist } from 'common/types/playlist'
import { defineStore } from 'pinia'
import { STORT_ID_PREFIX } from '../_utils'

interface MusicState {
  currentPlaylist: Playlist['id']
}

export const useMusicMessageStore = defineStore(`${STORT_ID_PREFIX}message-music`, {
  state: (): MusicState => ({
    currentPlaylist: ''
  }),
  actions: {
    updateCurrentPlaylist(id: Playlist['id']) {
      this.currentPlaylist = id
    }
  }
})
