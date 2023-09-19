import api from "/src/common/crud/BaseRequest";

export default {
  getRecordList: (arg) => api.get('/module/session/sessionrecord/getRecordSession',arg),
}
