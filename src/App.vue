<template>
  <div id="app">

    <top-bar
        :links="mobileMenuLinks"
    />

    <transition
        name="slide-left"
    >
      <mobile-menu
          ref="mobileMenu"
          :links="mobileMenuLinks"
          v-if="isMenuOpened && !isDesktop"
      />
    </transition>

    <transition name="fade">
      <div
          v-if="isMenuOpened && !isDesktop"
          class="mobile-menu__overlay"
          @click="closeMobileMenu"
      />
    </transition>

    <main class="main">
      <router-view/>
    </main>

    <main-footer/>

    <transition-group name="fade">
      <custom-modal
          v-for="item in getOpenedModals"
          :key="item.name"
          :class="[
          'custom-modal--show-elements',
          `custom-modal--${item.name}`
        ]"
          :component-name="item.name"
          :modal-props="item.props"
      >
        <component
            :is="item.component"
            :modal-props="item.props"
        />
      </custom-modal>
    </transition-group>

    <div
        v-if="$route.name === 'home'"
        class="blobs"
    >
      <div class="blob blob-top-left"></div>
      <div class="blob blob-top-right"></div>
      <div class="blob blob-bottom-left"></div>
      <div class="blob blob-bottom-right"></div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { debounce } from 'lodash'

import TopBar from "@/components/top-bar";
import MobileMenu from "@/components/mobile-menu";
import mainFooter from "@/components/main-footer";
import customModal from "@/common-components/custom-modal";

export default {
  name: 'app',
  components: { MobileMenu, TopBar, mainFooter, customModal },
  data () {
    return {
      isPositionFixed: false,
      isModalOpened: false,
      isDarkMode: null,
      modalProps: {
        type: Object,
        default: () => ({})
      },
    }
  },
  watch: {
    isPositionFixed: function () {
      this.isPositionFixed ? this.$bus.emit('set-position-fixed') : this.$bus.emit('remove-position-fixed')
    },
    '$route' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$bus.emit('close-mobile-menu')
      }

      this.setHistoryLengthIfRouteChange({
        newRoute: newValue,
        oldRoute: oldValue,
        value: 1
      })
    },
  },
  created() {
    this.setHistoryStartValues()

    this.toggleTheme()

    window.addEventListener('resize', this.onResize, { passive: true })
    this.changeSizeFlag()
  },
  mounted () {
    this.$bus.on('set-position-fixed', () => {
      this.isPositionFixed = true
      document.querySelector('body').classList.add('overflow--hidden')
    })
    this.$bus.on('remove-position-fixed', () => {
      this.isPositionFixed = false
      document.querySelector('body').classList.remove('overflow--hidden')
    })
    this.$bus.on('open-mobile-menu', () => {
      this.openMenu()
      this.$bus.emit('set-position-fixed')
    })
    this.$bus.on('close-mobile-menu', () => {
      this.closeMenu()
      this.$bus.emit('remove-position-fixed')
    })

    this.startHistoryLength = 0
  },
  computed: {
    ...mapGetters(['mobileMenuLinks']),
    ...mapGetters(['isDesktop']),
    ...mapGetters(['isMenuOpened']),
    ...mapGetters(['getOpenedModals']),
    ...mapGetters(['isDarkModeOn'])
  },
  methods: {
    ...mapActions(['changeSizeFlag']),
    ...mapActions(['setHistoryStartValues', 'setHistoryLengthIfRouteChange']),
    ...mapActions(['openMenu', 'closeMenu']),
    closeMobileMenu() {
      this.$bus.emit('close-mobile-menu')
    },
    toggleTheme () {
      this.isDarkModeOn
          ? document.documentElement.classList.add('dark-mode')
          : document.documentElement.classList.remove('dark-mode')
    },
    onResize: debounce(function () {
      if (this.windowWidth !== window.innerWidth) {
        this.windowWidth = window.innerWidth
        this.changeSizeFlag()
      }
    }, 500),
  }
}

</script>

<style lang="scss">
@import "assets/scss/main.scss";
</style>