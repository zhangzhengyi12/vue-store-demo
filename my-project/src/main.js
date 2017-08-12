// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "./components/layout.vue"
import IndexPage from "./pages/index.vue"
import http from "vue-resource"
Vue.use(VueRouter)
Vue.use(http)

Vue.config.productionTip = false


let router = new VueRouter({ 
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
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
