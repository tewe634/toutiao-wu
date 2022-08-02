import request from '@/utils/requst'

// 获取文章新闻推荐  get  /v1_0/articles
export const getArtickApi = (id, timestamp) =>
  request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: id,
      timestamp
    }
  })
