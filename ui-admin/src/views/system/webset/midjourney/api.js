import api from "/src/common/crud/BaseRequest";

export default {
  // 刷新socket连接
  againConnect: (arg) => api.getRestful('/module/cmj/cmjaccount/againConnect',arg),
}
