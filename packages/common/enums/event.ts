/** 窗口相关事件 */
enum WindowMessageType {
  miniWindow = 'mini-window',
  maxWindow = 'max-window',
  closeWindow = 'close-window',
}

/** 播放列表相关事件 */
enum PlaylistMessageType {
  getPlaylist = 'get-playlist',
  createPlaylist = 'create-playlist',
  renamePlaylist = 'rename-playlist',
  deletePlaylist = 'delete-playlist',
}

/** 汇总事件 */
export const MessageType = {
  ...WindowMessageType,
  ...PlaylistMessageType
}

/** 汇总事件类型 */
export type MessageType = WindowMessageType | PlaylistMessageType;
