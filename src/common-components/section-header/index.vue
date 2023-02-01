<template>
  <component
      :is="componentName"
      :class="{
       'section-h1': level === 1,
       'section-h2': level === 2,
       'section-h3': level === 3,
       'section-h4': level === 4,
       'section-h5': level === 5,
       'section-h6': level === 6,
       }"
      v-html="text"
  />
</template>

<script>
export default {
  name: 'section-header',
  props: {
    isDiv: {
      type: Boolean,
      default: false,
    },
    level: {
      type: [Number, String],
      default: 1
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    componentName() {
      return this.isDiv ? 'div' : 'h' + this.level
    }
  },
}
</script>

<style src="./style.scss" lang="scss"/>
