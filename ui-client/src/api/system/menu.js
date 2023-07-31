import request from '@/utils/request'

const baseApi = "/module/system/sysmenu";

// 根据权限获取菜单信息，转换成树结构
export function selectPermissionTree() {
  return request({
    url: baseApi + '/selectPermissionTree',
    method: 'post',
    data: {}
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: baseApi + '/selectPermissionTreeModel',
    method: 'post',
    data: {}
  })
}

// 获取路由（前端进入页面时左侧路由）
export function selectPermissionRoute() {
  return request({
    url: baseApi + '/selectPermissionRoute',
    method: 'post',
    data: {}
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: baseApi + '/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

