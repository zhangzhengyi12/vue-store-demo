// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "./components/layout.vue"
import IndexPage from "./pages/index.vue"
import DetailPage from "./pages/detail.vue"
import http from "vue-resource"
import callofdely from "./pages/detail/callofdely"
import lol from "./pages/detail/lol.vue"
import shenmi from "./pages/detail/shenmi.vue"
import light from "./pages/detail/light.vue"
import orderList from "./pages/orderList.vue"
Vue.use(VueRouter)
Vue.use(http)

Vue.config.productionTip = false


let router = new VueRouter({ 
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      component: DetailPage,
       redirect: '/detail/callofdely',
      children: [
        {
          path: "callofdely",
          component: callofdely
        },
        {
          path: "lol",
          component: lol
        },
        {
          path: "shenmi",
          component:shenmi
        },
        {
          path: "light",
          component: light
        }
      ]
    },
    {
      path: "/orderList",
      component:orderList
    }
  ]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { Layout }
})
