import api from '/src/utils/request/BaseRequest'

const webConfig = {
  state: {
    configMain: {}
  },
  mutations: {
    SET_CONFIG_MAIN: (state, data) => {
      state.configMain = data;
    }
  },
  actions: {
    FlushWebConfigMain({ commit }) {
      return new Promise((resolve) => {
        api.getRestful('/module/system/baseresourceconfig/queryByConfigKey','main').then(res => {
          commit('SET_CONFIG_MAIN',JSON.parse(res.data.resourceValue))
          commit('SET_LOADING_STATE_CONFIG',true)
          resolve()
        })
      })
    }
  }
}

export default webConfig
