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

// /v1_0/articles/:article_id 获取新闻详情
export const getNewsInfo = (articleId) =>
  request({ url: `/v1_0/articles/${articleId}`, method: 'GET' })

// /v1_0/comments  获取评论或评论回复
export const getNewsTrait = (params) =>
  request({ url: '/v1_0/comments', params, method: 'GET' })

//  /v1_0/article/collections  收藏文章
export const getNewsCollect = (data) =>
  request({ url: '/v1_0/article/collections', method: 'POST', data })
// /v1_0/article/collections/:target 取消收藏文章
export const getNewsCancel = (target) =>
  request({ url: `/v1_0/article/collections/${target}`, method: 'DELETE' })
// 对评论或评论回复点赞   /v1_0/comment/likings post
export const getLikeApi = (data) =>
  request({ url: '/v1_0/comment/likings', method: 'POST', data })

//  /v1_0/comment/likings/:target 取消对评论或评论回复点赞
export const getUnfollow = (target) =>
  request({ url: `/v1_0/comment/likings/${target}`, method: 'DELETE' })

//  /v1_0/article/likings 对文章点赞 post
export const getLike = (data) =>
  request({ url: '/v1_0/article/likings', method: 'POST', data })
//   /v1_0/article/likings/:target  取消对文章点赞
export const getRecusal = (target) =>
  request({ url: `/v1_0/article/likings/${target}`, method: 'DELETE' })
// /v1_0/comments 对文章或者评论进行评论 post
export const addComment = (data) =>
  request({ url: 'v1_0/comments', method: 'POST', data })
