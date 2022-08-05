import request from '@/utils/requst'
import Storage from '@/utils/storage'
// 获取用户的频道  /v1_0/user/channels get

export const getChannel = () =>
  request({
    url: '/v1_0/user/channels'
  })

// 获取所有频道列表 get  /v1_0/channels
export const getMyChannel = () =>
  request({ url: '/v1_0/channels', method: 'GET' })

// 删除指定用户频道 Path： /v1_0/user/channels/:target
export const delectChannel = (target) =>
  request({ url: `/v1_0/user/channels/${target}`, method: 'DELETE' })

// 设置用户的频道 /v1_0/user/channels
export const addChannel = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: { channels: [{ id, seq }] }
  })
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
// 本地存channel
export const SetMyChannelToLocal = (channels) => {
  Storage.set(HEIMA_TOUTIAO_MY_CHANNELS, channels)
}
// 取值
export const getMyChannelBylocal = () => {
  return Storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
