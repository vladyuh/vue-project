import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/home'
import PageNotFound from "@/views/404";

Vue.use(VueRouter)

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: `/projects`,
    name: 'projects',
    component: () => import(/* webpackChunkName: "news" */ '../views/projects')
  },
  {
    path: `/projects/:code`,
    name: 'projects/page',
    component: () => import(/* webpackChunkName: "news-page" */ '../views/projects/page'),
    props: true
  },
  {
    path: "*",
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
