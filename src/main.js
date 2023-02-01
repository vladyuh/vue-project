import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBus from "vue-bus";
import Vuebar from 'vuebar';
import VueLazyload from 'vue-lazyload';
import { throttle } from 'lodash'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuebar)
Vue.use(VueBus)

Vue.use(VueLazyload, {
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  listenEvents: ['scroll']
})

Vue.directive('scroll', {
  inserted (el, binding) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler

    el.scrollHandler = throttle((evt) => {
      if (handler(evt, el)) {
        window.removeEventListener('scroll', el.scrollHandler)
      }
    }, binding.value.throttleTime ?? 500)

    window.addEventListener('scroll', el.scrollHandler, { passive: true })
  },
  unbind (el) {
    if (el.scrollHandler) {
      window.removeEventListener('scroll', el.scrollHandler)
    }
  }
})

Vue.directive('resize', {
  inserted (el, binding) {
    let viewportWidth = window.innerWidth

    el.resizeHandler = (evt) => {
      if (binding.modifiers.onlyX) {
        if (viewportWidth === window.innerWidth) {
          return
        }
        viewportWidth = window.innerWidth
      }
      binding.value (evt, el)
    }

    window.addEventListener('resize', el.resizeHandler)
  },

  unbind (el) {
    if (el.resizeHandler) {
      window.removeEventListener('resize', el.resizeHandler)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
