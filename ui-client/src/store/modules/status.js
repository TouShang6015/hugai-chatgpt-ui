const status = {
  state: {
    authDialog: false,
    loginDialog: false,
    registerDialog: false,
    loadingStateConfig: false,
    loadingStateUserInfo: false,
  },

  mutations: {
    SET_AUTH_DIALOG: (state, data) => {
      state.authDialog = data
    },
    SET_LOGIN_DIALOG: (state, loginDialog) => {
      state.loginDialog = loginDialog
    },
    SET_REGISTER_DIALOG: (state, registerDialog) => {
      state.registerDialog = registerDialog
    },
    SET_LOADING_STATE_CONFIG: (state, data) => {
      state.loadingStateConfig = data
    },
    SET_LOADING_STATE_USER_INFO: (state, data) => {
      state.loadingStateUserInfo = data
    },
  },
}

export default status
