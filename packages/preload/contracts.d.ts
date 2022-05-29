import type { MessageType, messageMap } from './src/sendMessage'

declare global {
  interface Exposed {
    readonly sendMessage: Readonly<messageMap[MessageType]>
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends Exposed {}
}
