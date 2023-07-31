import request from '@/utils/request'

const baseApi = "/module/system/sysuser";

// 删除用户
export function delUser(userId) {
  return request({
    url: baseApi + '/baseDeleteByIds/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(id, password,version) {
  const data = {
    id,
    password,
    version
  }
  return request({
    url: baseApi + '/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(id, status,version) {
  const data = {
    id,
    status,
    version
  }
  return request({
    url: baseApi + '/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/module/system/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/module/system/profile/update',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/module/system/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/module/system/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: baseApi + '/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: baseApi + '/insertAuthRole',
    method: 'put',
    params: data
  })
}
