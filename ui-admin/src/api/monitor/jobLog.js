import request from '@/utils/request'

const baseApi = "/module/quartz/sysjoblog";

// 清空调度日志
export function cleanJobLog() {
  return request({
    url: baseApi + '/clean',
    method: 'delete'
  })
}
