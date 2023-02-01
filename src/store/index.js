import Vue from 'vue'
import Vuex from 'vuex'
import breakpoints from "@/store/modules/breakpoints";
import goBack from "@/store/modules/goBack";
import menu from "@/store/modules/menu";
import overlay from "@/store/modules/overlay";
import modals from "@/store/modules/modals";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mobileMenuLinks: [
      {
        iconName: "ic_home",
        label: "Главная",
        href: "/"
      },
      {
        iconName: "ic_apps",
        label: "Проекты",
        href: "/projects"
      },
    ],
    breadcrumbs: [
      { href: '/', text: 'Главная' },
      { href: '/projects', text: 'Компоненты' },
    ],
  },
  getters: {
    mobileMenuLinks: state => {
      return state.mobileMenuLinks;
    },
    breadcrumbs: state => {
      return state.breadcrumbs;
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    breakpoints,
    goBack,
    menu,
    overlay,
    modals
  }
})
