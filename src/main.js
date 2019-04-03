import Vue from 'vue'
import './assets/css/common/clear.css'
import './assets/js/rem.js'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
import md5 from 'js-md5'
Vue.prototype.$md5 = md5;
//引入请求拦截文件
import setaxios from './setaxios'
setaxios()
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
