import { chrome } from '../../.electron-vendors.cache.json'
import { join } from 'path'
import { builtinModules } from 'module'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const PACKAGE_ROOT = __dirname

const config: UserConfig = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData:
          '@import "@/style/global/index.less"; @import (reference) "@/style/vars/index.less";'
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  base: '',
  server: {
    fs: {
      strict: true
    }
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      external: [...builtinModules.flatMap(p => [p, `node:${p}`])]
    },
    emptyOutDir: true,
    brotliSize: false
  }
}

export default config
