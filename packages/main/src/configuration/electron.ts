const ElectronStore = require('electron-store')
import type * as Store from 'electron-store'
import type { ConfigurationBase } from '../base/configuration'
import log from 'electron-log'

const configLog = log.scope('config')

export class ElectronConfiguration implements ConfigurationBase {
  // TODO: 类型需要 fix 一下，每次 set 后需要更新此类型
  private store: Store<Record<string, unknown>>

  constructor() {
    this.store = new ElectronStore()
  }

  get<T>(key: string, defaultValue?: T) {
    configLog.debug(`获取 [${key}] 对应的配置，默认值为：`, defaultValue)
    const val = this.store.get(key, defaultValue) as T ?? defaultValue

    configLog.debug(`获取 [${key}] 值为：`, val)

    return val
  }

  set(key: string, value: unknown) {
    this.store.set(key, value)
    configLog.debug(`设置 [${key}] 对应的配置值为：`, value)
    return true
  }

  del(key: string) {
    this.store.delete(key)
    configLog.debug(`删除 [${key}] 对应的配置值`)
    return true
  }

  has(key: string) {
    const isExists = this.store.has(key)

    configLog.debug(`[${key}] ${isExists ? '' : '不'}存在配置值`)

    return isExists
  }

  len(): number {
    const len = this.store.size

    configLog.debug(`当前 store 共有 ${len} 条配置`)

    return len
  }
}
