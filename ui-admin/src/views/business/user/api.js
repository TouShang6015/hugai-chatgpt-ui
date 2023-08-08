import api from "/src/common/crud/BaseRequest";

export default {
  domainInsert: (arg) => api.post('/module/session/domain/baseAdd',arg),

  domainUpdate: (arg) => api.put('/module/session/domain/baseEdit',arg),
}
