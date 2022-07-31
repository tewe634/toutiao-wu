// 封装token
class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
    // 不是字符串转成json字符串
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  set(key, value) {
  // 判断类型是复杂数据类型且不是null再转成json字符串
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
