import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标
import '@/assets/fonts/iconfont.css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入移动端适配
import 'amfe-flexible'
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayJs.locale('zh-cn')
dayJs.extend(relativeTime)
Vue.prototype.dayjs = dayJs

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App)
}).$mount('#app')
