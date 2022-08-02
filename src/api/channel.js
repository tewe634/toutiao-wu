// 获取用户的频道  /v1_0/user/channels get

import request from '@/utils/requst'

export const getChannel = () =>
  request({
    url: '/v1_0/user/channels'
  })
