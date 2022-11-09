<script>
import { unzipFile } from './lib/files'
import { toSandboxFiles } from './lib/sandbox'

export default {
  name: 'SandboxPreview',
  props: {
    file: { type: File, default: null }
  },

  data() {
    return {
      id: '0',
      worker: null
    }
  },

  watch: {
    async file() {
      const files = await unzipFile(this.file)
      if (this.worker && this.worker.active) {
        const id = (Math.random() * 1000000).toFixed(0)

        // send sandbox URL to worker
        this.worker.active.postMessage({
          type: 'REGISTER_REFERRER',
          data: {
            id,
            referrer: {
              base: `${location.origin}/sandbox/preview.html`,
              root: `${location.origin}/sandbox/`
            }
          }
        })

        // send the data to the service worker
        this.worker.active.postMessage({
          type: 'REGISTER_URLS',
          data: {
            id,
            record: toSandboxFiles(files)
          }
        })

        this.id = id
      }
    },
    id() {
      if (this.$refs.iframe && this.id !== '0') {
        const previewUrl = `${location.origin}/sandbox/preview.html?id=${this.id}`
        // load the sandbox preview into the iframe, then service workers do the job
        this.$refs.iframe.src = previewUrl
      }
    }
  },

  async mounted() {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sandbox/worker.js', { scope: '/sandbox' })
        this.worker = reg
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <iframe ref="iframe" sandbox="allow-scripts allow-same-origin" />
</template>
