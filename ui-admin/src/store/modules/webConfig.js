import api from '../../common/crud/BaseRequest'

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
        api.get('/module/system/baseresourceconfig/clientConfig').then(res => {
          commit('SET_CONFIG_MAIN',res.data.resourceMain)
          resolve()
        })
      })
    }
  }
}

export default webConfig
