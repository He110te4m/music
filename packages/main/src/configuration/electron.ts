import * as ElectronStore from 'electron-store'
import type { ConfigurationBase } from '../base/configuration'

export class ElectronConfiguration implements ConfigurationBase {
  store: ElectronStore<Record<string, unknown>>

  constructor() {
    this.store = new ElectronStore()
  }

  get<T>(key: string, defaultValue?: T): T {
    return this.store.get(key, defaultValue) as T
  }

  set(key: string, value: unknown) {
    this.store.set(key, value)
    return true
  }

  del(key: string) {
    this.store.delete(key)
    return true
  }

  has(key: string) {
    return this.store.has(key)
  }
}
