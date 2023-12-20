// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Blueberry',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
      ],
      output: {
        globals: {},
      },
    },
  },
})
