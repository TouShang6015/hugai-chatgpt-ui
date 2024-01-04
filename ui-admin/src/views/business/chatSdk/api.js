import api from "/src/common/crud/BaseRequest";

export default {
  // 平台
  chatSdkBaseAdd: (arg) => api.post('/module/config/chatsdk/baseAdd',arg),
  chatSdkBaseEdit: (arg) => api.put('/module/config/chatsdk/baseEdit',arg),
}
