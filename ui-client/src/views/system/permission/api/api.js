import api from "/src/common/crud/BaseRequest";

export default {
  // 分配路由模块
  allocationRouteModule: (arg) => api.post('/module/system/syspermission/allocationRouteModule',arg),
  // 权限基本新增
  permissionBaseAdd: (arg) => api.post('/module/system/syspermission/baseAdd',arg),
  // 权限基本修改
  permissionBaseEdit: (arg) => api.put('/module/system/syspermission/baseEdit',arg),
}
