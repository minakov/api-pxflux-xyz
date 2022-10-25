import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'

export const envDir = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages(), Layouts()],
  envDir,
  resolve: {
    alias: {
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      crypto: 'crypto-browserify',
      util: 'util',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': process.env ?? {},
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true })],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
    },
  },
})
