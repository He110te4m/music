import { type BrowserWindow } from 'electron'
import { usePlaylistIPC } from './ipc/playlist'
import { useWindowIPC } from './ipc/window'

export function useIPC(window: BrowserWindow) {
  useWindowIPC(window)
  usePlaylistIPC()
}
