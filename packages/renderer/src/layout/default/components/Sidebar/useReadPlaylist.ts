import { type  Playlist } from 'common/types/playlist'
import { usePlaylistMessageStore } from 'store/message/playlist'
import { onMounted, ref } from 'vue'

export function useReadPlaylist() {
  /** 已有的 playlist */
  const list = ref<Playlist[]>([])

  const { getPlaylist } = usePlaylistMessageStore()
  async function updatePlaylist() {
    list.value = await getPlaylist()
  }

  onMounted(updatePlaylist)

  return {
    list,
    updatePlaylist
  }
}
