import api from "/src/common/crud/BaseRequest";

export default {
  // 清空日志
  cleanLogininfor: (arg) => api.delete('/module/system/syslogininfor/clean'),
}
