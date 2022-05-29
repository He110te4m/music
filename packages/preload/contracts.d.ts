import type { MessageMap } from '@/sendMessage'
import type { MessageType } from 'common/enums/event'

type MessageFn = {
  [TKey in keyof MessageMap]: (message: MessageType, ...args: Parameters<MessageMap[TKey]>) => ReturnType<MessageMap[TKey]>
}

declare global {
  interface Exposed {
    readonly sendMessage: MessageFn | ((message: MessageType) => void)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends Exposed {}
}
