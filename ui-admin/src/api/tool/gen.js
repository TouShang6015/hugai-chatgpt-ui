import request from '@/utils/request'

/**
 * 获取列表
 * @param param
 */
export function genList(param) {
  return request({
    url: '/module/generate/queryList',
    method: 'get',
    params: param
  })
}

/**
 * 代码生成
 * @param param
 */
export function generateStart(param) {
  return request({
    url: '/module/generate/generateStart',
    method: 'post',
    responseType: 'blob',
    data: param
  })
}
