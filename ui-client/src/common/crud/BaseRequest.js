import request from '@/utils/request';

/**
 * get-Restful请求
 * @param url
 * @param param
 * @param baseUrl
 */
export function getRestful(url,param,baseUrl) {
  return request({
    url: baseUrl + '/' + url + "/" + param,
    method: 'get'
  })
}

/**
 * get请求
 * @param url
 * @param param
 * @param baseUrl
 */
export function getR(url,param,baseUrl) {
  return request({
    url: baseUrl + '/' + url,
    method: 'get',
    params: param
  })
}

/**
 * put请求
 * @param url
 * @param param
 * @param baseUrl
 */
export function putR(url,param,baseUrl) {
  return request({
    url: baseUrl + '/' + url,
    method: 'put',
    data: param
  })
}

/**
 * post请求
 * @param url
 * @param param
 * @param baseUrl
 */
export function postR(url,param,baseUrl) {
  return request({
    url: baseUrl + '/' + url,
    method: 'post',
    data: param
  })
}

/**
 * delete请求
 * @param url
 * @param param
 * @param baseUrl
 */
export function deleteR(url,param,baseUrl) {
  return request({
    url: baseUrl + '/' + url + '/' + param,
    method: 'delete'
  })
}

export default {
  get: (url,arg) => request({url: url, method: 'get',params: arg}),
  getRestful: (url,arg) => request({url: url + '/' + arg, method: 'get'}),
  post: (url,arg) => request({url: url, method: 'post',data: arg}),
  put: (url,arg) => request({url: url, method: 'put',data: arg}),
  delete: (url,arg) => request({url: url, method: 'delete',params: arg}),
  deleteRestful: (url,arg) => request({url: url + '/' + arg, method: 'delete'}),
}
