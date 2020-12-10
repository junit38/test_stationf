import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$serverUrl = 'http://0.0.0.0:3000'

new Vue({
  render: h => h(App),
}).$mount('#app')
