<script lang="ts" setup>
import { useMusicMessageStore } from 'store/message/music'
import { ref, unref, useAttrs, computed } from 'vue'
import type { Playlist } from 'common/types/playlist'
import { useShowMenu } from '../../composables/useShowMenu'
import SidebarPlaylist from './SidebarPlaylist.vue'
import { useReadPlaylist } from './useReadPlaylist'
import { useDeletePlaylist } from './useDeletePlaylist'
import { useEditPlaylist } from './useEditPlaylist'
import { useMessage } from 'naive-ui'

const attrs = useAttrs()

const { list: playlistList, updatePlaylist } = useReadPlaylist()

const { updateCurrentPlaylist } = useMusicMessageStore()

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

const {
  isShowPlaylistModal,
  title,
  currentPlaylistTitle,
  addFn,
  renameFn,
  submitFn
} = useEditPlaylist(onCloseMenu)

function onAdd() {
  addFn()
}

function onRename() {
  renameFn(unref(currentPlaylist))
}

function onSubmit({ title }: Record<'title', string>) {
  return submitFn(unref(title), updatePlaylist, unref(currentPlaylist))
}

const { deleteFn } = useDeletePlaylist(afterOpr)

const isLastPlaylist = computed(() => {
  return playlistList.value.length < 2
})

function onDelete() {
  if (isLastPlaylist.value) {
    useMessage().error('至少需要有一个播放列表')
    return
  }

  deleteFn(unref(currentPlaylist))
}

function afterOpr() {
  onCloseMenu()
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
      class="default-sidebar__playlist hand"
      @click.left="updateCurrentPlaylist(item.id)"
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
          :disabled="isLastPlaylist"
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
    :submit="onSubmit"
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
