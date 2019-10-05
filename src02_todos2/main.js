/* 入口JS */
/* eslint-disable no-new */

import Vue from 'vue'
import App from './App.vue'
import './base.css'


//创建一个vm对象作为全局事件总线对象，并挂载在Vue原型对象上
//所有的组件都可以看到它==>可以通过它来进行事件机制通信
Vue.prototype.$globalEventBus = new Vue()

new Vue({
  el: '#app',
  components: {
    App
  },
template: '<App/>'
})
