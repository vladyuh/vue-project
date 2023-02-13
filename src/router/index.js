import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from "@/views/404";

Vue.use(VueRouter)

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home')
  },
  {
    path: `/projects`,
    name: 'projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects')
  },
  {
    path: `/projects/:code`,
    name: 'projects/page',
    component: () => import(/* webpackChunkName: "projects-page" */ '../views/projects/page'),
    props: true
  },
  {
    path: `/styles`,
    name: 'styles',
    component: () => import(/* webpackChunkName: "styles" */ '../views/styles')
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
