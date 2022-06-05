<script lang="ts" setup>
import { toRefs } from 'vue'
import { useMusicMessageStore } from 'store/message/music'

const { currentPlaylist } = toRefs(useMusicMessageStore())
</script>

<template>
  <NList>
    <NListItem>
      {{ currentPlaylist }}
    </NListItem>
  </NList>
</template>
