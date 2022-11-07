<script>
import FileList from '~/components/Preview/FileList.vue'

export default {
  name: 'IndexPage',
  components: {
    FileList
  },

  data() {
    return {
      files: []
    }
  },

  methods: {
    onFiles(e) {
      this.files = Array.from(e.target.files)
      console.log('onFiles', this.files)
      e.target.value = ''
    }
  }
}
</script>

<template>
  <div>
    <input type="file" accept="application/zip, application/x-zip-compressed" @change="onFiles">
    <FileList :files="files" />
  </div>
</template>
