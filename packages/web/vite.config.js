import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages(), Layouts()],
  envDir: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..'),
  ssr: {
    target: 'webworker',
    noExternal: /./,
  },
  build: {
    minify: false,
  },
  resolve: {
    // necessary because vue.ssrUtils is only exported on cjs modules
    alias: [
      {
        find: '@vue/runtime-dom',
        replacement: '@vue/runtime-dom/dist/runtime-dom.cjs.js',
      },
      {
        find: '@vue/runtime-core',
        replacement: '@vue/runtime-core/dist/runtime-core.cjs.js',
      },
    ],
  },
})
