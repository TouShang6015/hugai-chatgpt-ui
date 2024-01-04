import api from "/src/common/crud/BaseRequest";

export default {
  flushPaymentServiceCache: (arg) => api.get('/module/reading/paymentAdmin/flushPaymentServiceCache'),
}
