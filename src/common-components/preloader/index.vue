<template>
  <div
    :class="[
      'main-preloader',
      { 'main-preloader--full-page': fullPage }
    ]"
  >
    <div class="main-preloader__inner">
      <div class="main-preloader__spinner"/>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'preloader',
  props: {
    fullPage: Boolean,
    removeOverflow: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.fullPage) {
      this.addBodyOverflow()
    }
  },
  beforeDestroy() {
    if (this.removeOverflow) {
      this.removeBodyOverflow()
    }
  },
  methods: {
    ...mapActions(['addBodyOverflow', 'removeBodyOverflow'])
  }
}
</script>

<style src="./style.scss" lang="scss" />
