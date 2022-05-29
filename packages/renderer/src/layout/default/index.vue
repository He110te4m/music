<script lang="ts" setup>
import LayoutHeader from './Header.vue'
import LayoutFooter from './Footer.vue'
import LayoutSidebar from './Sidebar.vue'
import { useLayoutStore } from '@/store/layout'

const { isShowHeader, isShowFooter, isShowSidebar } = useLayoutStore()
</script>

<template>
  <LayoutHeader
    v-show="isShowHeader"
    class="default-layout__header"
  />
  <main class="default-layout__body">
    <router-view />
    <LayoutSidebar
      v-show="isShowSidebar"
      class="default-layout__sidebar"
    />
  </main>
  <LayoutFooter
    v-show="isShowFooter"
    class="default-layout__footer"
  />
</template>
