import { type Playlist } from 'common/types/playlist'
import { usePlaylistMessageStore } from 'store/message/playlist'
import { ref } from 'vue'

export function useEditPlaylist(afterFn: () => void) {
  /** 是否显示“输入播放列表名弹窗” */
  const isShowPlaylistModal = ref(false)
  /** “输入播放列表名弹窗”的弹窗标题 */
  const title = ref('')
  /** “输入播放列表名弹窗”的预设值 */
  const currentPlaylistTitle = ref('')

  const { createPlaylist, renamePlaylist } = usePlaylistMessageStore()

  /** 新增播放列表 */
  function addFn() {
    title.value = '新增播放列表'
    currentPlaylistTitle.value = ''
    afterFn()
    isShowPlaylistModal.value = true
  }

  /** 重命名播放列表 */
  function renameFn(playlist: Playlist | null) {
    if (!playlist) {
      return
    }
    title.value = '重命名播放列表'
    currentPlaylistTitle.value = playlist.title
    afterFn()
    isShowPlaylistModal.value = true
  }

  async function submitFn(title: string, afterFn: () => void, currentPlaylist: Playlist | null) {
    if (!currentPlaylistTitle.value) {
      const res = await createPlaylist(title)
      if (res === true) {
        afterFn()
      }
      return res
    }

    if (!currentPlaylist) {
      return false
    }

    const res = await renamePlaylist({
      id: currentPlaylist.id,
      title
    })

    if (res === true) {
      afterFn()
    }

    return res
  }

  return {
    currentPlaylistTitle,
    isShowPlaylistModal,
    title,
    addFn,
    renameFn,
    submitFn
  }
}
