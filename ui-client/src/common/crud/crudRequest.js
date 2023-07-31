import request from '@/utils/request';

/**
 * 分页查询
 * @param data
 */
export function baseQueryPageByParam(url,data) {
  return request({
    url: url + '/baseQueryPageByParam',
    method: 'post',
    data: data
  })
}

/**
 * 根据列表查询
 * @param url
 * @param data
 */
export function baseQueryByParam(url,data) {
  return request({
    url: url + '/baseQueryByParam',
    method: 'post',
    data: data
  })
}

/**
 * 根据主键id查询
 * @param url
 * @param data
 */
export function baseQueryById(url,data) {
  return request({
    url: url + '/baseQueryById/' + data,
    method: 'get'
  })
}

/**
 * 新增
 * @param url
 * @param data
 */
export function baseAdd(url,data) {
  return request({
    url: url + '/baseAdd',
    method: 'post',
    data: data
  })
}

/**
 * 修改
 * @param url
 * @param data
 */
export function baseEdit(url,data) {
  return request({
    url: url + '/baseEdit',
    method: 'put',
    data: data
  })
}

/**
 * 删除
 * @param url
 * @param data
 */
export function baseDeleteByIds(url,data) {
  return request({
    url: url + '/baseDeleteByIds/' + data,
    method: 'delete'
  })
}
