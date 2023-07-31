import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/module/system/sysmenu/selectPermissionRoute',
    method: 'POST',
    data: {}
  })
}
