<template>
  <div
    id="top-menu"
    class="burger"
    @click="clickHandler($event)"
  >
    <icon
      icon-name="ic_menu"
      class="burger__icon"
      width="24"
      height="24"
    />
  </div>
</template>

<script>

import Icon from '@/common-components/icon'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'burger',
  components: {
    Icon
  },
  props: {
    stopPropagation: Boolean
  },
  methods: {
    clickHandler (e) {
      if (this.stopPropagation) {
        e.stopPropagation()
      }

      this.$emit('click', e)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>
