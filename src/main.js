// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import _ from 'lodash'
import App from './App'


Vue.use(Vuetify, {
  theme: {
    primary: '#bf360c',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(VueResource)
Vue.use(_)
NProgress.configure({ easing: 'ease', speed: 500, minimum: 0.8, showSpinner: false });
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
