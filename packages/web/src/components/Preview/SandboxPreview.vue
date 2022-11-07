<template>
  <iframe sandbox="allow-scripts allow-same-origin" />
</template>

<script>
export default {
  name: 'SandboxPreview',
  props: {
    files: { type: Array, default: () => [] }
  },

  data () {
    return {
      worker: null
    }
  },

  watch: {
    files () {

    }
  },

  mounted () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sandbox/worker.js', { scope: '/sandbox' })
        .then((reg) => {
          worker = reg
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
