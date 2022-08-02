import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = store.state.tokenObj.token
    // 有token每次发请求在请求头都带上
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
