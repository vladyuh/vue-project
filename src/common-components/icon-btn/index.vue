<template>
  <button
      class="icon-btn"
      :class="{
        'icon-btn--filled': filled,
        'icon-btn--outline': outline,
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
import {mapActions, mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'icon-btn',
  components: {
    Icon,
  },
  props: {
    filled: Boolean,
    noBg: Boolean,
    outline: Boolean,
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
    isBackButton: Boolean
  },
  computed: {
    ...mapGetters(['getStartHistoryLength', 'getHistoryLength']),
  },
  methods: {
    ...mapActions(['setHistoryLength']),
    clickHandler(e) {
      if (this.stopPropagation) {
        e.stopPropagation()
      }

      if(this.isBackButton) {
        this.goBack()
      }

      this.$emit('click', e)
    },
    goBack () {
      if (this.getHistoryLength > this.getStartHistoryLength) {
        this.$router.go(-1)
        this.setHistoryLength(-2)
      } else {
        this.$router.push('/').catch(() => {})
      }
    },
  }
}
</script>

<style src="./style.scss" lang="scss"/>