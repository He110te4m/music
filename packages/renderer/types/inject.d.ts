declare global {
  interface Window {
    sendMessage: (message: MessageType) => void
  }
}

export {}
