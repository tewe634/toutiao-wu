// 封装转换图片的异步回调
export const resuletsImg = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader() // 创建读文件的对象
    fr.readAsDataURL(file) // 转换为base64字符串
    fr.onload = (e) => {
      // 事件接收成功的回调
      resolve(e.target.result)
    }
  })
}
