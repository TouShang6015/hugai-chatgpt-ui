const defaultSetting = {
  hiddenStatusLeft: false,
  hiddenStatusSessionList: false,
  theme: 'blue'
}

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const state = {
  hiddenStatusLeft: storageSetting.hiddenStatusLeft === undefined ? defaultSetting.hiddenStatusLeft : storageSetting.hiddenStatusLeft,
  hiddenStatusSessionList: storageSetting.hiddenStatusSessionList === undefined ? defaultSetting.hiddenStatusSessionList : storageSetting.hiddenStatusSessionList,
  theme: storageSetting.theme === undefined ? defaultSetting.theme : storageSetting.theme,
}

const mutations = {
}

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
}

export default {
  namespaced: true,
  mutations,
  state,
  actions
}
