import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 至少返回一个空对象
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))
    // tokenObj: storage.get('HEIMA_TOUTIAO_TOKEN') || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SEND_TOKEN(state, payload) {
      console.log(1)
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOKEN', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
