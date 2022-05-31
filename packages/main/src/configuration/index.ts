import { ConfigKey } from '@/enums/config'
import { ElectronConfiguration } from './electron'

export const configuration = new ElectronConfiguration()

if (!configuration.has(ConfigKey.playlist)) {
  configuration.set(ConfigKey.playlist, [{
    id: 'default',
    title: '默认播放列表'
  }])
}
