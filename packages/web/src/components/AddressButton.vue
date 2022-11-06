<script>
export default {
  name: 'AddressButton',
  props: {
    address: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    value() {
      return this.address.substring(0, 6) + '...' + this.address.substring(this.address.length - 4)
    },
    clazz() {
      return [
        this.onClick ? 'v-address-btn-clickable' : null,
        this.dark ? 'v-address-btn-dark' : 'v-address-btn-light'
      ]
    }
  }
}
</script>

<template>
  <button class="v-btn v-address-btn" :title="address" :class="clazz">
    <div v-if="address" class="v-address-box">
      <b>{{ value }}</b>
    </div>
    <span v-else>Connected</span>
  </button>
</template>

<style scoped>
.v-address-btn {
  border-radius: 11px;
  padding: 0.65em 1.25em 0.65em 1em;
}

.v-address-btn-light {
  background-color: #eee;
}

.v-address-btn-dark {
  background-color: #212121;
  color: white;
}

.v-address-btn-clickable {
  cursor: pointer;
}

.v-address-btn-light.v-address-btn-clickable:hover {
  background-color: #ddd;
}

.v-address-btn-dark.v-address-btn-clickable:hover {
  background-color: #353535;
}

.v-address-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
