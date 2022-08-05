import request from '@/utils/requst'
/**
 * 获取建议数据
 * @param {String} q
 * @returns
 */
export const getSearchSuggestionApi = (q) =>
  request({ url: '/v1_0/suggestion', params: { q } })
