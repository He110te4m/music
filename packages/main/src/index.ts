import { engine } from './adapts'
import * as log from 'electron-log'

if (import.meta.env.PROD) {
  log.transports.file.level = 'info'
  log.transports.console.level = false
}

if (import.meta.env.DEV) {
  log.transports.file.level = false
  log.transports.console.level = 'silly'
}

engine.init()
