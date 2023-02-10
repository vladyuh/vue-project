<template>
  <button
      class="icon-btn"
      :class="{
        'icon-btn--filled': filled,
        'icon-btn--no-bg': noBg,
    }"
      :type="type"
      :disabled="disabled"
      v-bind="$attrs"
      @click="clickHandler($event)"
  >
    <icon
        v-if="icon"
        class="icon-btn__icon"
        :icon-name="icon"
    />
  </button>
</template>

<script>
import Icon from '@/common-components/icon'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'icon-btn',
  components: {
    Icon,
  },
  props: {
    filled: Boolean,
    noBg: Boolean,
    spinner: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    stopPropagation: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    },
  },
  methods: {
    clickHandler(e) {
      if (this.stopPropagation) {
        e.stopPropagation()
      }

      this.$emit('click', e)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>