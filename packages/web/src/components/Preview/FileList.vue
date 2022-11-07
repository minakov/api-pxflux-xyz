<script>
import { toFileStructure } from './lib/files'
import FileItem from './FileItem.vue'

export default {
  name: 'FileList',
  components: {
    FileItem
  },
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
  <ul>
    <FileItem class="item" :children="structure" />
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}

.bold {
  font-weight: bold;
}
</style>
