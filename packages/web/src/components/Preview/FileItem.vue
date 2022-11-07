<script>
export default {
  name: 'FileItem', // necessary for self-reference
  props: {
    name: {
      type: String,
      default: null
    },
    children: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    isFolder() {
      console.log(this.name)
      return Object.keys(this.children ?? []).length
    }
  }
}
</script>

<template>
  <li>
    <div v-if="name" :class="{ bold: isFolder }" @click="toggle">
      {{ name }}
    </div>
    <ul v-if="isFolder">
      <FileItem v-for="[key, items] in Object.entries(children)" :key="key" class="item" :name="key"
        :children="items" />
    </ul>
  </li>
</template>
