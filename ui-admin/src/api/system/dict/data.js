import request from '@/utils/request'

const baseApi = "/module/system/basedictdata";

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: baseApi + '/getListByDictType/' + dictType,
    method: 'get'
  })
}
