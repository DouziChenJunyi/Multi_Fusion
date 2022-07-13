import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import less from 'less'
import '@/style/global.css'
import '@/style/element_ui.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.43.192:5000/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(less)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
