import { chrome } from '../../.electron-vendors.cache.json'
import { builtinModules } from 'module'
import type { UserConfig } from 'vite'
import { join } from 'path'

const PACKAGE_ROOT = __dirname

const config: UserConfig = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
      'common/': join(PACKAGE_ROOT, '../common/') + '/'
    }
  },
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', ...builtinModules.flatMap(p => [p, `node:${p}`])],
      output: {
        entryFileNames: '[name].cjs'
      }
    },
    emptyOutDir: true,
    brotliSize: false
  }
}

export default config
