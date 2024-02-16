import { resolve } from 'node:path'
import { terser } from 'rollup-plugin-terser'

import * as packageJson from './package.json'
import dts from 'vite-plugin-dts'

const defineConfig = (configEnv) => ({
  plugins: [dts({
    entryRoot: './components'
  })],
  css: {
    modules: true
  },
  build: {
    minify: 'terser',
    lib: {
      entry: resolve('.', 'components/index.ts'),
      name: 'ReactViteLibrary',
      formats: ['es'],
      fileName: (format) => 'index.js'
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [terser()]
    }
  },
  optimizeDeps: {
    include: ['react']
  }
})

export default defineConfig
