import api from "/src/common/crud/BaseRequest";

export default {
  // 根据参数键名查询参数值
  editByConfigKey: (arg) => api.put('/module/system/baseresourceconfig/editByConfigKey',arg),
  // 文件列表查询
  queryListFileConfig: (arg) => api.post('/module/system/sysfileconfig/baseQueryByParam',arg),

  updateFileConfig: (arg) => api.put('/module/system/sysfileconfig/baseEdit',arg),

  // 模型列表
  queryChatModelLabelOption: (arg) => api.get('/module/config/chatmodel/getLabelOption',arg),
}
