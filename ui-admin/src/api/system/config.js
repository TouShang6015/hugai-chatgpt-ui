import request from '@/utils/request'

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/module/system/baseresourceconfig/queryByConfigKey/' + configKey,
    method: 'get'
  })
}
