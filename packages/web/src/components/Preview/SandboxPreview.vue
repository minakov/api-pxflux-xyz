<script>
import { unzipFile } from './lib/files'

export default {
  name: 'SandboxPreview',
  props: {
    file: { type: File, default: null }
  },

  data() {
    return {
      id: '0',
      worker: null,
      files: []
    }
  },

  watch: {
    async file() {
      if (isZip(this.file?.name)) {
        this.files = await unzipFile(this.file)
      }
    },
    files() {
      if (this.files && this.worker && this.worker.active) {
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
            record
          }
        })

        this.id = id
      }
    },
    id() {
      if (this.$refs.iframe && id !== '0') {
        const previewUrl = `${location.origin}/sandbox/preview.html?id=${id}&fxhash=${hash}`
        // load the sandbox preview into the iframe, then service workers do the job
        this.$refs.iframe.src = previewUrl
      }
    }
  },

  mounted() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sandbox/worker.js', { scope: '/sandbox' })
        .then((reg) => {
          this.worker = reg
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<template>
  <iframe ref="iframe" sandbox="allow-scripts allow-same-origin" />
</template>
