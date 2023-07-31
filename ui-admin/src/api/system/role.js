import request from '@/utils/request'

const baseApi = "/module/system/sysrole";

// 角色数据权限
export function dataScope(data) {
  return request({
    url: baseApi + '/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function editRole(param) {
  return request({
    url: baseApi + '/editRole',
    method: 'put',
    data: param
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: baseApi + '/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: baseApi + '/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: baseApi + '/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: baseApi + '/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: baseApi + '/authUser/selectAll',
    method: 'put',
    params: data
  })
}

/**
 * 角色分配路由权限
 * @param param
 */
export function roleAllocationRoute(param) {
  return request({
    url: baseApi + '/roleAllocationRoute',
    method: 'put',
    data: param
  })
}
