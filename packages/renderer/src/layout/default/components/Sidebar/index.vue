<script lang="ts" setup>
import { usePlaylistMessageStore } from 'store/message/playlist'
import { onMounted, ref, unref, useAttrs } from 'vue'
import type { Playlist } from 'common/types/playlist'
import { useShowMenu } from '../../composables/useShowMenu'
import SidebarPlaylist from './SidebarPlaylist.vue'

const attrs = useAttrs()

/** 已有的 playlist */
const playlistList = ref<Playlist[]>([])
const { getPlaylist, createPlaylist, deletePlaylist, renamePlaylist } = usePlaylistMessageStore()
async function updatePlaylist() {
  playlistList.value = await getPlaylist()
}

onMounted(updatePlaylist)

/** 记录当前右键的 playlist */
const currentPlaylist = ref<Playlist | null>(null)
const { isShowMenu, onContextMenu: onMouseRightClick, menuPoint } = useShowMenu()
function onCloseMenu() {
  isShowMenu.value = false
}
function onContextMenu(e: PointerEvent, playlist: Playlist | null = null) {
  onMouseRightClick(e)
  currentPlaylist.value = playlist
}

/** 是否显示“输入播放列表名弹窗” */
const isShowPlaylistModal = ref(false)
/** “输入播放列表名弹窗”的弹窗标题 */
const title = ref('')
/** “输入播放列表名弹窗”的预设值 */
const currentPlaylistTitle = ref('')

/** 新增播放列表 */
function onAdd() {
  title.value = '新增播放列表'
  currentPlaylistTitle.value = ''
  onCloseMenu()
  isShowPlaylistModal.value = true
}

/** 重命名播放列表 */
function onRename() {
  if (!currentPlaylist.value) {
    return
  }
  title.value = '重命名播放列表'
  currentPlaylistTitle.value = currentPlaylist.value.title
  onCloseMenu()
  isShowPlaylistModal.value = true
}

function onSubmit({ title }: Record<'title', string>) {
  if (currentPlaylistTitle.value) {
    if (!currentPlaylist.value) {
      return
    }

    // 有预设值，是重命名
    renamePlaylist({
      id: currentPlaylist.value.id,
      title: unref(title)
    })
  } else {
    // 没有预设值，是新增播放列表
    createPlaylist(unref(title))
  }

  updatePlaylist()
}

function onDelete() {
  if (!currentPlaylist.value) {
    return
  }
  onCloseMenu()
  deletePlaylist(currentPlaylist.value.id)

  updatePlaylist()
}
</script>

<template>
  <NList
    v-bind="attrs"
    class="default-sidebar"
    @contextmenu.prevent="onContextMenu"
  >
    <NListItem
      v-for="item in playlistList"
      :key="item.id"
      class="default-sidebar__playlist"
      @contextmenu.prevent.stop="(e: PointerEvent) => onContextMenu(e, item)"
    >
      <NEllipsis class="default-sidebar__playlist__title">
        {{ item.title }}
      </NEllipsis>
    </NListItem>
  </NList>

  <NPopover
    :show="isShowMenu"
    :x="menuPoint.x"
    :y="menuPoint.y"
    raw
    placement="bottom"
    :show-arrow="false"
    trigger="manual"
    @clickoutside="onCloseMenu"
  >
    <NList>
      <NListItem>
        <NButton
          text
          @click="onAdd"
        >
          新增
        </NButton>
      </NListItem>
      <NListItem v-if="currentPlaylist">
        <NButton
          text
          @click="onRename"
        >
          重命名
        </NButton>
      </NListItem>
      <NListItem v-if="currentPlaylist">
        <NButton
          text
          @click="onDelete"
        >
          删除
        </NButton>
      </NListItem>
    </NList>
  </NPopover>

  <SidebarPlaylist
    v-model:show="isShowPlaylistModal"
    :title="title"
    :value="currentPlaylistTitle"
    @submit="onSubmit"
  />
</template>

<style lang="less">
@import (reference) '../../style/vars.less';

.default-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18A058;
  padding: @padding;
  padding-right: 0;

  &__playlist {
    width: 100%;
    text-align: right;
    border-bottom: none !important;

    &>.n-list-item__main,
    &__title {
      max-width: 100%;
    }
  }
}
</style>
