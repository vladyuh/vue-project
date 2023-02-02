<template>
  <header
      class="top-bar"
      id="top-bar"
      ref="topBar"
      v-scroll="onScroll"
      v-resize="onScroll"
      :class="[
          { 'show-top-bar': isShowTopBar },
          { 'is-top': isTop }
      ]"
  >
    <div class="container top-bar__container">
      <burger
          v-if="!isDesktop"
          class="top-bar__burger"
          @click="burgerClick"
      />
      <div class="top-bar__logo">Vue UI Kit</div>
      <div
          v-if="isDesktop"
          class="top-bar__nav"
      >
        <ul class="top-bar__nav-items">

          <li
              class="top-bar__nav-item"
              v-for="(link, i) in links"
              :key="i"
          >
            <router-link
                v-if="link.href"
                :to="link.href"
                class="top-bar__nav-link"
            >

              <div class="top-bar__nav-link-text">
                {{ link.label }}
              </div>


            </router-link>

          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import { throttle } from 'lodash'
import burger from "@/common-components/burger";


const CONTENT_RECT_TOP = 56

export default {
  name: "top-bar",
  components: {
    burger
  },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isScrolled: false,
      isShowTopBar: true,
      isTop: true,
      previousCoordinates: -CONTENT_RECT_TOP,
      forceShowMenu: false,
      windowWidth: 0
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth
  },
  created () {
    this.$bus.on('set-force-show-topbar', this.setForceShowMenu)
  },
  beforeDestroy () {
    this.$bus.off('set-force-show-topbar', this.setForceShowMenu)
  },
  computed: {
    ...mapGetters(['isDesktop'])
  },
  methods: {
    burgerClick () {
      this.$bus.emit('open-mobile-menu')
    },
    setForceShowMenu (value) {
      this.forceShowMenu = !!value
    },
    onScroll: throttle(function () {
      if (this.forceShowMenu) {
        this.isShowTopBar = true

        return
      }

      const contentWrap = document.querySelectorAll('.main')[0]

      if (!contentWrap) {
        return
      }

      const currentCoordinates = contentWrap.getBoundingClientRect().top - CONTENT_RECT_TOP

      this.isShowTopBar = (currentCoordinates >= this.previousCoordinates)
      this.forceShowMenu = false
      this.isTop = false

      if (this.windowWidth !== window.innerWidth) {
        this.isShowTopBar = true
      }

      setTimeout(() => {
        this.previousCoordinates = currentCoordinates >= -CONTENT_RECT_TOP ? -CONTENT_RECT_TOP : currentCoordinates
        this.windowWidth = window.innerWidth

        if(currentCoordinates === -CONTENT_RECT_TOP) {
          this.isTop = true
        }
      }, 200)
    }, 100),
  }
}

</script>

<style src="./style.scss" lang="scss"/>