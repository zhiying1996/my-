import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import axios from "axios";
import VueClipboard from 'vue-clipboard2';
import echarts from 'echarts'
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'
Vue.prototype.$echarts = echarts 


Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.config.productionTip = false

Vue.prototype.$axios = axios;


router.beforeEach((to, from, next) => {
  let token = JSON.parse(sessionStorage.getItem('token'));
  if (!token && to.path != '/HelloWorld') {
    next({ path: '/HelloWorld' })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
