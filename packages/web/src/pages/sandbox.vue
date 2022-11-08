<script>
import FileList from '~/components/Preview/FileList.vue'
import SandboxPreview from '~/components/Preview/SandboxPreview.vue'

export default {
  name: 'SandboxPage',
  components: {
    FileList,
    SandboxPreview
  },

  data() {
    return {
      files: [],
      file: null
    }
  },

  methods: {
    onFiles(e) {
      const files = Array.from(e.target.files)
      e.target.value = ''
      if (files.length === 1) {
        this.file = files[0]
      }
      this.files = files
    }
  }
}
</script>

<template>
  <div>
    <input type="file" accept="application/zip, application/x-zip-compressed" @change="onFiles">
    <FileList :files="files" />
    <SandboxPreview :file="file" />
  </div>
</template>
