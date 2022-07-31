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
