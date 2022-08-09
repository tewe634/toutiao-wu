import request from '@/utils/requst'
/**
 *
 * @param {*string} mobile 手机号
 * @param {*string} code 验证码
 * @returns
 */
// 登入注册  /v1_0/authorizations post 参数 mobile code
export const getLogin = (data) =>
  request({
    url: '/v1_0/authorizations',
    data,
    method: 'POST'
  })
// 短信验证 /v1_0/sms/codes/:mobile  get请求 参数mobile
export const getCode = (mobile) =>
  request({ url: `/v1_0/sms/codes/${mobile}`, method: 'GET' })
/**
 * 获取用户自己的信息 /v1_0/user/profile
 * @returns
 */
export const getInfo = () => request({ url: '/v1_0/user/profile' })
//  编辑用户照片资料（头像、身份证照片） /v1_0/user/photo
export const updataAouther = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({ url: '/v1_0/user/photo', method: 'PATCH', data: fm })
}

// 编辑用户个人资料 /v1_0/user/profile
export const updataUserInfo = (data) =>
  request({ url: '/v1_0/user/profile', method: 'PATCH', data })
//  /v1_0/user/followings 关注用户
export const updataAttention = (data) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data
  })
//   /v1_0/user/followings/:target 取消关注用户
export const updataCancel = (target) =>
  request({ url: `/v1_0/user/followings/${target}`, method: 'DELETE' })
//  /v1_0/user 获取用户自己信息
export const getUsersInfo = () => request({ url: '/v1_0/user' })
