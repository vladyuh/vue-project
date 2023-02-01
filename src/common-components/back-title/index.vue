<template>
  <div
    ref="backTitleWrap"
    v-scroll="onScroll"
    v-resize="onResize"
    class="back-title__wrap"
    :style="heightBackTitle"
  >
    <div class="back-title__inner fixed back-title__fake_height">
      <div class="back-title__button">
        <icon
            icon-name="ic_back"
            width="24"
            height="24"
        />
      </div>
      <div
        :class="[
          'back-title__button-text',
          {'back-title__button-text--capitalize': capitalize }
        ]"
        v-html="text"
      />
    </div>
    <div
      ref="backTitleInnerCreat"
      class="back-title__inner back-title__fake_height-all"
    >
      <div class="back-title__button">
        <icon
          icon-name="ic_back"
          width="24"
          height="24"
        />
      </div>
      <div
        :class="[
          'back-title__button-text',
          {'back-title__button-text--capitalize': capitalize }
        ]"
        v-html="text"
      />
    </div>
    <div
      id="back-title"
      ref="backTitleInner"
      :class="[`back-title__inner`, { 'fixed': fixedBackTitle }]"
    >
      <div class="container back-title__container">
        <div
            class="back-title__inner-2"
        >
          <div
              class="back-title__button"
              @click="goBack"
          >
            <icon
                icon-name="ic_back"
                width="24"
                height="24"
            />
          </div>
          <div
              :class="[
            'back-title__button-text',
            { 'back-title__button-text--capitalize': capitalize }
          ]"
              v-html="text"
          />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from 'lodash'
import Icon from "@/common-components/icon";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'back-title',
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    capitalize: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      fixedBackTitle: false,
      heightBackTitle: 0
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (newRoute !== oldRoute) {
        this.$nextTick(() => {
          this.changeHeight('backTitleInnerCreat')
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getStartHistoryLength', 'getHistoryLength']),
  },
  mounted () {
    this.changeHeight('backTitleInnerCreat')
  },
  methods: {
    ...mapActions(['setHistoryLength']),
    changeHeight (el) {
      const refHeight = this.$refs[el].offsetHeight

      this.heightBackTitle = `height: ${refHeight}px;`
    },
    goBack () {
      if (this.getHistoryLength > this.getStartHistoryLength) {
        this.$router.go(-1)
        this.setHistoryLength(-2)
      } else {
        this.$router.push('/').catch(() => {})
      }
    },
    onScroll: throttle(function () {
      const backTitleWrap = this.$refs.backTitleWrap
      const headerHeight = document.querySelectorAll('.top-bar')[0].offsetHeight
      const currentCoordinates = backTitleWrap.getBoundingClientRect().top - headerHeight

      if (currentCoordinates <= 0) {
        this.fixedBackTitle = true
      } else if (currentCoordinates > 3) {
        this.fixedBackTitle = false
      }
    }, 100),
    onResize: debounce(function () {
      this.fixedBackTitle ? this.changeHeight('backTitleInnerCreat') : this.changeHeight('backTitleInner')
    }, 700)
  }
}
</script>

<style src="./style.scss" lang="scss"/>
