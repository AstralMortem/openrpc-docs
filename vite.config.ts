import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), ui({
    autoImport:{
      dirs: ['./src/components']
    }
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenRPCDocs',
      fileName: (format) => `openrpc-docs.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'openrpc-docs.css'
          return assetInfo.name as string
        }
      }
    },
    cssCodeSplit: false
  }
})