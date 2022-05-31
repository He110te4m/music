import type { MessageMap } from '@/sendMessage'
import type { MessageType } from 'common/enums/event'

type MessageFn = {
  [TKey in keyof MessageMap]: (message: TKey, ...args: Parameters<MessageMap[TKey]>) => ReturnType<MessageMap[TKey]>
}[MessageType]

declare global {
  interface Exposed {
    readonly sendMessage: MessageFn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends Exposed {}
}
