<template>
  <div
      class="mobile-menu"
      v-bar
  >
    <div class="mobile-menu__inner">
      <div class="container mobile-menu__container">
        <div class="mobile-menu__top">
          <div
              class="mobile-menu__close"
              @click="closeMobileMenu"
          >
            <icon
              icon-name="ic_menu-close"
              width="24"
              height="24"
            />
          </div>
        </div>
        <div class="mobile-menu__nav">
          <ul class="mobile-menu__nav-items">

            <li
                class="mobile-menu__nav-item"
                v-for="(link, i) in links"
                :key="i"
            >
              <router-link
                  v-if="link.href"
                  :to="link.href"
                  :class="['mobile-menu__nav-link', { 'mobile-menu__nav-link--with-icon' : link.iconName }]"
              >

                <icon
                    v-if="link.iconName"
                    class="mobile-menu__nav-link-icon"
                    :icon-name="link.iconName"
                    width="24"
                    height="24"
                />

                <div class="mobile-menu__nav-link-text">
                  {{ link.label }}
                </div>


              </router-link>

            </li>
          </ul>
        </div>
        <div class="mobile-menu__bottom">
          <switcher
              name="dark-mode"
              id="dark-mode"
              class="mobile-menu__dark-mode"
              @input="changeDarkMode"
              :value="isDarkMode"
          >
            <span>Тёмная тема</span>
          </switcher>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import icon from "@/common-components/icon";
import Switcher from "@/common-components/switcher";

export default {
  name: "mobile-menu",
  components: {
    Switcher,
    icon
  },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDarkMode: null
    }
  },
  beforeDestroy() {
    this.closeMenu()
  },
  created () {
    let darkmode = JSON.parse(localStorage?.getItem('darkmode'))

    if(!darkmode) {
      localStorage.setItem('darkmode', false)
      darkmode = false
    }

    this.isDarkMode = darkmode
  },
  methods: {
    ...mapActions(['closeMenu']),
    closeMobileMenu () {
      this.$bus.emit('close-mobile-menu')
    },
    changeDarkMode () {
      this.isDarkMode = !this.isDarkMode
      this.$bus.emit('darkmode-change', this.isDarkMode)
    }
  }
}

</script>

<style src="./style.scss" lang="scss"/>