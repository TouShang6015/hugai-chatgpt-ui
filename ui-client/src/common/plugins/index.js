import modal from './modal'

export default {
  install(Vue) {
    // 模态框对象
    Vue.prototype.$modal = modal
  }
}
