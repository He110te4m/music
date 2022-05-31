<script lang="ts" setup>
import LayoutHeader from './components/Header.vue'
import LayoutFooter from './components/Footer.vue'
import LayoutSidebar from './components/Sidebar/index.vue'
import { useLayoutStore } from 'store/layout'

const { isShowHeader, isShowFooter, isShowSidebar } = useLayoutStore()
</script>

<template>
  <LayoutHeader
    v-show="isShowHeader"
    class="default-layout__header"
  />
  <main class="default-layout__body">
    <LayoutSidebar
      v-show="isShowSidebar"
      class="default-layout__sidebar"
    />
    <div class="default-layout__main">
      <router-view />
    </div>
  </main>
  <LayoutFooter
    v-show="isShowFooter"
    class="default-layout__footer"
  />
</template>

<style lang="less">
@import (reference) './style/vars.less';

.default-layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  & &__header {
    flex: 0 0 32px;
    align-items: center;
    padding: 0 @padding;
  }

  & &__body {
    flex: 1 1 0%;
    display: flex;
  }

  & &__sidebar {
    flex: 0 0 @sidebarWidth;
    max-width: @sidebarWidth;
  }

  & &__main {
    flex: 1 1 0%;
  }

  & &__footer {
    flex: 0 0 30px;
    padding: 0 @padding;
  }
}
</style>
