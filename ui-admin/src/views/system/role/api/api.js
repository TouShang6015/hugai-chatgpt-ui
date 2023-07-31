import api from "/src/common/crud/BaseRequest";

export default {
  // 根据权限获取菜单树结构
  getMenuTreeByPermission: () => api.post('/module/system/sysmenu/selectPermissionTreeModel',{}),
  // 根据角色ID查询菜单下拉树结构
  getMenuTreeByRoleId: (arg) => api.getRestful('/module/system/sysmenu/roleMenuTreeselect',arg),
  // 获取路由树列表 根据当前登录者
  getRolePermissionTreeByLogin: (arg) => api.get('/module/system/syspermission/rolePermissionTreeList',arg),
  // 获取路由，根据角色id
  getRolePermissionByRoleId: (arg) => api.getRestful('/module/system/syspermission/rolePermissionByRoleId',arg),
  // 角色状态修改
  editRole: (arg) => api.put('/module/system/sysrole/editRole',arg),

  // 查询授权用户列表
  allocatedUserList: (arg) => api.get('/module/system/sysrole/authUser/allocatedList',arg),
  // 取消用户授权角色
  authUserCancel: (arg) => api.put('/module/system/sysrole/authUser/cancel',arg),
  // 批量取消用户授权角色
  authUserCancelAll: (arg) => api.put('/module/system/sysrole/authUser/cancelAll',arg),
  // 角色分配路由权限
  roleAllocationRoute: (arg) => api.put('/module/system/sysrole/roleAllocationRoute',arg),
  // 查询角色未授权用户列表
  unallocatedUserList: (arg) => api.get('/module/system/sysrole/authUser/unallocatedList',arg),
  // 授权用户选择
  authUserSelectAll: (arg) => api.put('/module/system/sysrole/authUser/selectAll',arg),
}
