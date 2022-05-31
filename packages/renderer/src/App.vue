<script lang="ts" setup>
import { computed, ref } from 'vue'
import { LayoutTypeEnum } from '@/layout/enums'
import { useLayout } from '@/layout/composables/useLayout'
import defaultLayout from '@/layout/default/index.vue'
import { useLayoutStore } from 'store/layout'
import { zhCN, dateZhCN } from 'naive-ui'
import { WindowMinimizeRegular, WindowRestoreRegular, WindowMaximizeRegular } from '@vicons/fa'
import { CloseFilled } from '@vicons/material'
import { useWindowMessageStore } from 'store/message/window'
import { overrideTheme } from '@/style/themes'

const layoutMap = {
  [LayoutTypeEnum.default]: defaultLayout
}

const { type: layoutType, cls: layoutCls } = useLayout()

const layout = computed(() =>
  layoutMap[layoutType] ?? defaultLayout)

const { appName } = useLayoutStore()
const { maxWindow, miniWindow, closeWindow } = useWindowMessageStore()

let isMax = ref(false)
async function onMax () {
  isMax.value = await maxWindow()
}
</script>

<template>
  <NConfigProvider
    class="layout"
    :class="layoutCls"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="overrideTheme"
  >
    <NMessageProvider>
      <div class="layout-toolbar drag">
        <div class="layout-toolbar__title">
          {{ appName }}
        </div>
        <div class="layout-toolbar__opr">
          <NIcon
            class="layout-toolbar__opr__item hand no-drag"
            @click="miniWindow"
          >
            <WindowMinimizeRegular />
          </NIcon>
          <NIcon
            class="layout-toolbar__opr__item hand no-drag"
            @click="onMax"
          >
            <WindowMaximizeRegular v-show="!isMax" />
            <WindowRestoreRegular v-show="isMax" />
          </NIcon>
          <NIcon
            class="layout-toolbar__opr__item hand no-drag"
            @click="closeWindow"
          >
            <CloseFilled />
          </NIcon>
        </div>
      </div>
      <keep-alive>
        <component :is="layout" />
      </keep-alive>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="less">
.layout {
  &-toolbar {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    font-size: @mdFont;

    &__title {
      flex: 1 1 0%;
    }

    &__opr {
      flex: 0 0 100px;
      display: flex;

      &__item {
        flex: 1 1 0%;
        text-align: center;
      }
    }
  }
}
</style>
