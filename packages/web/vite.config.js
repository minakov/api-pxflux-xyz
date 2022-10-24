import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export const envDir = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envDir
})
