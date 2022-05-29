import { app, Menu } from 'electron'

export function initWindow() {
  hideMenu()
}

function hideMenu () {
  Menu.setApplicationMenu(null)
  // hide menu for Mac
  if (process.platform !== 'darwin') {
    app.dock?.hide()
  }
}
