import { playlistHandler } from '@/modules/playlist'

export function useDestroy() {
  playlistHandler.store()
}
