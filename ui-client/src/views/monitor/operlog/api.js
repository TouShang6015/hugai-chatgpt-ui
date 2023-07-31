import api from "/src/common/crud/BaseRequest";

export default {
  // 清空操作日志
  cleanOperlog: (arg) => api.delete('/module/system/sysoperlog/clean'),
}
