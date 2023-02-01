<template>
  <div
    ref="togglesInner"
    class="toggles"
  >
    <div
      v-for="(toggle, index) in toggles"
      :key="index"
      class="toggles__item"
      :class="{ 'toggles__item--active': activeToggle === toggle.code}"
      @click="clickToggle($event, toggle, index)"
    >
      <div class="toggles__content">
        <span class="toggles__title">{{ toggle.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from '@/mixins/tabs'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'toggles',
  mixins: [tabs],
  props: {
    toggles: Array,
  },
  data () {
    return {
      activeIndex: 0,
      activeToggle: this.toggles[0]?.code
    }
  },
  computed: {
    activeTabSelector () {
      return this.$refs.togglesInner.querySelector('.toggles__item--active')
    }
  },
  watch: {
    getActiveTab: {
      immediate: true,
      handler: function () {
        this.$nextTick(() => {
          this.scrollToActiveTab(this.activeTabSelector, this.$refs.togglesInner, this.toggles, this.activeIndex)
        })
      }
    }
  },
  mounted () {
    this.scrollToActiveTab(this.activeTabSelector, this.$refs.togglesInner, this.toggles, this.activeIndex)
    this.$emit('active-index-change', this.activeToggle)
  },
  methods: {
    clickToggle (event, toggle, index) {
      this.scrollToActiveTab(event?.target, this.$refs.togglesInner, this.toggles, index)
      this.activeTabIndex()
      this.activeToggle = toggle.code
      this.$emit('active-index-change', this.activeToggle)
    },
    activeTabIndex () {
      const toggles = this.$refs?.togglesInner?.querySelectorAll('.toggles__item')

      toggles.forEach((el, index) => {
        if (el.classList.contains('toggles__item--active')) {
          this.activeIndex = index
        }
      })
    }
  }
}
</script>

<style scoped src="./styles.scss" lang="scss"/>
