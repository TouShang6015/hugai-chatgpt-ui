import api from "/src/common/crud/BaseRequest";

export default {
  // 查询部门下拉树结构
  getDeptTreeSelect: () => api.get('/module/system/sysdept/treeselect'),
  // 角色下拉
  getRoleOption: () => api.get('/module/system/sysrole/getLabelOption'),
  // 修改用户状态
  changeUserStatus: (arg) => api.put('/module/system/sysuser/changeStatus',arg),
  // 重置密码
  updateUserPassword: (arg) => api.put('/module/system/sysuser/resetPwd',arg),
  // 查询授权角色
  getAuthRole: (arg) => api.getRestful('/module/system/sysuser/authRole',arg),
  // 修改用户个人信息
  updateUserProfile: (arg) => api.put('/module/system/profile/update',arg),
  // 用户头像上传
  uploadAvatar: (arg) => api.post('/module/system/profile/avatar',arg),
  // 用户密码重置
  updateUserPwd: (arg) => api.put('/module/system/profile/updatePwd',arg),
  // 查询用户个人信息
  getUserProfile: () => api.get('/module/system/profile'),
  // 保存授权角色
  updateAuthRole: (arg) => api.put('/module/system/sysuser/insertAuthRole',arg),
}
