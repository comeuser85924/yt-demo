import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'; //全局引入axios套件
import 'video.js/dist/video-js.css'
import './assets/scss/style.scss';
import './assets/css/main.css';
Vue.config.productionTip = false
require('axios')
// Vue.prototype.$http = axios //註冊axios
require('videojs-youtube')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
