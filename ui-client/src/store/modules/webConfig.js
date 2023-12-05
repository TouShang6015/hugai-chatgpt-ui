import api from '/src/utils/request/BaseRequest'

const webConfig = {
  state: {
    resourceMain: {},
    resourcePromotionConfig: {},
    resourceAccountConfig: {},
  },
  mutations: {
    SET_RESOURCE_MAIN: (state, data) => {
      state.resourceMain = data;
    },
    SET_RESOURCE_PROMOTION_CONFIG: (state, data) => {
      state.resourcePromotionConfig = data;
    },
    SET_RESOURCE_ACCOUNT_CONFIG: (state, data) => {
      state.resourceAccountConfig = data;
    }
  },
  actions: {
    FlushWebConfigMain({ commit }) {
      return new Promise((resolve) => {
        api.get('/module/system/baseresourceconfig/clientConfig').then(res => {
          if (res.status){
            commit('SET_RESOURCE_MAIN',res.data.resourceMain)
            commit('SET_RESOURCE_PROMOTION_CONFIG',res.data.resourcePromotionConfig)
            commit('SET_RESOURCE_ACCOUNT_CONFIG',res.data.resourceAccountConfig)
          }
          commit('SET_LOADING_STATE_CONFIG',true)
          resolve()
        })
      })
    }
  }
}

export default webConfig
