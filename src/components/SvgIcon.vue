<template>
  <i class="iconfont" :class="iconName"></i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      required: false
    }
  },
  computed: {
    iconName() {
      return `icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped>

</style>
