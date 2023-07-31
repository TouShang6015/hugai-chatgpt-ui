import request from '@/utils/request'

const baseApi = "/module/quartz/sysjob";

// 任务状态修改
export function changeJobStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: baseApi + '/changeStatus',
    method: 'put',
    data: data
  })
}


// 定时任务立即执行一次
export function runJob(id, jobGroup) {
  const data = {
    id,
    jobGroup
  }
  return request({
    url: baseApi + '/run',
    method: 'put',
    data: data
  })
}
