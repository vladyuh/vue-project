<template>
  <component
      :is="componentName"
      class="btn"
      :class="{
        'btn--elevated': elevated,
        'btn--tonal': tonal,
        'btn--outline': outline,
        'btn--no-bg': notbg,
        'btn--spinner-icon': spinner,
    }"
      :type="type"
      :disabled="disabled"
      :to="to"
      :href="href"
      :target="href ? '_blank' : undefined"
      v-bind="$attrs"
      @click="clickHandler($event)"
  >
    <icon
        v-if="icon"
        class="btn__icon"
        :icon-name="icon"
    />
    <spinner
        v-if="spinner"
        class="btn__icon-block"
    />
    <span
        class="btn__text"
        :class="{ 'btn__text--loading': spinner }"
    >
      <slot/>
    </span>
    <slot name="count"/>
  </component>
</template>

<script>
import Icon from '@/common-components/icon'
import Spinner from "@/common-components/spinner";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'btn',
  components: {
    Icon,
    Spinner
  },
  props: {
    elevated: Boolean,
    tonal: Boolean,
    outline: Boolean,
    notbg: Boolean,
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
    to: {
      type: [String, Object],
      default: undefined
    },
    href: {
      type: [String, Object],
      default: undefined
    }
  },
  computed: {
    componentName() {
      if (this.to) {
        return 'router-link'
      }
      else if (this.href) {
        return 'a'
      }
      return 'button'
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