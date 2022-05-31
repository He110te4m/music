import { usePlaylistMessageStore } from 'store/message/playlist'
import { ref } from 'vue'

export function useCreatePlaylist() {
  const { createPlaylist } = usePlaylistMessageStore()

  function onCreate () {
    createPlaylist
  }

  return {
    onCreate
  }
}
