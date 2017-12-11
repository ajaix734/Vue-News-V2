import Vue from 'vue'
import Router from 'vue-router'
import Carousel from '@/components/Carousel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DefaultCategory',
      component: DefaultCategory
    }
  ]
})
