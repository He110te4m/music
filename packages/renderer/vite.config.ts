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
      '@/': join(PACKAGE_ROOT, 'src') + '/',
      'composables/': join(PACKAGE_ROOT, 'src', 'composables') + '/',
      'router/': join(PACKAGE_ROOT, 'src', 'router') + '/',
      'style/': join(PACKAGE_ROOT, 'src', 'style') + '/',
      'store/': join(PACKAGE_ROOT, 'src', 'store') + '/',
      'views/': join(PACKAGE_ROOT, 'src', 'views') + '/',
      'common/': join(PACKAGE_ROOT, '..', 'common') + '/'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData:
          '@import "style/global/index.less"; @import (reference) "style/vars/index.less";'
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
      strict: true,
      allow: ['..']
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
  },
  optimizeDeps: {
    'include': [
      'pinia',
      'vue',
      'vue-router',
      'naive-ui',
      '@vicons/fa',
      '@vicons/material',
      '@vueuse/core'
    ]
  }
}

export default config
