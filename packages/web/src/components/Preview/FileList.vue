<script>
import { toFileStructure } from './lib/files'

export default {
  name: 'FileList',
  props: {
    files: { type: Array, default: () => [] }
  },
  data() {
    return {
      structure: null
    }
  },
  watch: {
    files: {
      async handler(files) {
        this.structure = await toFileStructure(files)
      },
      deep: true
    }
  }
}
</script>

<template>
  <div>{{ structure }}</div>
</template>
