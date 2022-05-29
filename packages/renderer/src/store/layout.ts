import { defineStore } from 'pinia'
import { STORT_ID_PREFIX } from './_utils'

export const useLayoutStore = defineStore(`${STORT_ID_PREFIX}layout`, {
  state: () => ({
    isShowHeader: true,
    isShowFooter: true,
    isShowSidebar: true,
    appName: '音乐播放器'
  }),

  actions: {
    changeHeaderVisible (isShowHeader: boolean) {
      this.isShowHeader = isShowHeader
    },
    changeFooterVisible (isShowFooter: boolean) {
      this.isShowFooter = isShowFooter
    },
    changeSidebarVisible (isShowSidebar: boolean) {
      this.isShowSidebar = isShowSidebar
    }
  }
})
