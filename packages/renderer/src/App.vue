<script lang="ts" setup>
import { computed } from 'vue'
import { LayoutTypeEnum } from '@/layout/enums'
import { useLayout } from '@/layout/composables/useLayout'
import defaultLayout from '@/layout/default/index.vue'
import { useLayoutStore } from './store/layout'
import { zhCN, dateZhCN } from 'naive-ui'
import { WindowMinimizeRegular, WindowCloseRegular, WindowMaximizeRegular } from '@vicons/fa'
import { MessageType } from '@/enums/message'

const layoutMap = {
  [LayoutTypeEnum.default]: defaultLayout
}

const { type: layoutType, cls: layoutCls } = useLayout()

const layout = computed(() =>
  layoutMap[layoutType] ?? defaultLayout)

const { appName } = useLayoutStore()

function onMini () {
  window.sendMessage(MessageType.miniWindow)
}

function onMax () {
  window.sendMessage(MessageType.maxWindow)
}

function onClose () {
  window.sendMessage(MessageType.closeWindow)
}
</script>

<template>
  <NConfigProvider
    class="layout"
    :class="layoutCls"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <div class="layout-toolbar drag">
      <div class="layout-toolbar__title">
        {{ appName }}
      </div>
      <div class="layout-toolbar__opr">
        <NIcon
          class="layout-toolbar__opr__item hand no-drag"
          @click="onMini"
        >
          <WindowMinimizeRegular />
        </NIcon>
        <NIcon
          class="layout-toolbar__opr__item hand no-drag"
          @click="onMax"
        >
          <WindowMaximizeRegular />
        </NIcon>
        <NIcon
          class="layout-toolbar__opr__item hand no-drag"
          @click="onClose"
        >
          <WindowCloseRegular />
        </NIcon>
      </div>
    </div>
    <keep-alive>
      <component :is="layout" />
    </keep-alive>
  </NConfigProvider>
</template>

<style lang="less">
@import '@/layout/style/global.less';
@import '@/layout/default/layout.less';
</style>
