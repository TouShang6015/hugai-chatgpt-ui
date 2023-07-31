import api from "/src/common/crud/BaseRequest";

export default {
  // 刷新字典缓存
  refreshCache: (arg) => api.delete('/module/system/basedicttype/flushCache'),
  // 查询字典类型列表
  dictTypeBaseQueryPageList: (arg) => api.post('/module/system/basedicttype/baseQueryPageByParam',arg),
  // 查询字典类型详细
  dictTypeBaseQueryById: (arg) => api.getRestful('/module/system/basedicttype/baseQueryById',arg),
}
