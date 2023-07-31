import request from '@/utils/request';

export const baseApi = "/module/system/syspermission";

/**
 * 接口路由同步
 */
export function mappingSync() {
  return request({
    url: baseApi + '/mappingSync',
    method: 'post'
  })
}
