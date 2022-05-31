import { MessageType } from 'common/enums/event'
import { defineStore } from 'pinia'
import { STORT_ID_PREFIX } from '../_utils'

export const useWindowMessageStore = defineStore(`${STORT_ID_PREFIX}message-window`, {
  getters: {
    maxWindow () {
      return () => window.sendMessage(MessageType.maxWindow)
    },
    miniWindow () {
      return () => window.sendMessage(MessageType.miniWindow)
    },
    closeWindow () {
      return () => window.sendMessage(MessageType.closeWindow)
    }
  }
})
