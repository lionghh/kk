import Vue from 'vue'
import './cube-ui'
import 'amfe-flexible'

import './style/index.styl'
import './http'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
//Vue.prototype.host = "http://localhost:8088/wx"
//Vue.prototype.host = "http://195.164.5.11/yymicapi"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
