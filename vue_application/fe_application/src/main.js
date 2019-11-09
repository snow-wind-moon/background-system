import Vue from 'vue'
import App from './App.vue'
import './fw'
import 'assets/style/reset.css'
import store from 'store'
import router from 'router'
import './filters'

Vue.config.productionTip = false

new Vue({
  store,// 注入，目的是整个项目每一个组件都可以使用 $store的属性
  router,
  render: h => h(App),
}).$mount('#app')
