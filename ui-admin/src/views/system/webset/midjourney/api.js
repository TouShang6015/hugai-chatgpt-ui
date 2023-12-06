import api from "/src/common/crud/BaseRequest";

export default {
  // 刷新socket连接
  againConnect: (arg) => api.getRestful('/module/config/cmjaccount/againConnect',arg),
}
