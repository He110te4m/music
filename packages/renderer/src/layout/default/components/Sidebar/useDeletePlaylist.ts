import { type Playlist } from 'common/types/playlist'
import { usePlaylistMessageStore } from 'store/message/playlist'

export function useDeletePlaylist(afterDelete: () => void) {
  const { deletePlaylist } = usePlaylistMessageStore()

  function deleteFn(playlist: Playlist | null) {
    if (!playlist) {
      return
    }
    deletePlaylist(playlist.id)
    afterDelete()
  }

  return {
    deleteFn
  }
}
