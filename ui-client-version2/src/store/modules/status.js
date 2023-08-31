const status = {
  state: {
    authDialog: false,
    loginDialog: false,
    registerDialog: false,
    loadingStateConfig: false,
    loadingStateUserInfo: false,
    accountDialog: false,
    settingDialog: false,
  },

  mutations: {
    SET_SETTING_DIALOG: (state, data) => {
      state.settingDialog = data
    },
    SET_ACCOUNT_DIALOG: (state, data) => {
      state.accountDialog = data
    },
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
    CLEAR_DIALOG: (state) => {
      state.authDialog = false;
      state.loginDialog = false;
      state.registerDialog = false;
      state.accountDialog = false;
      state.settingDialog = false;
    },
  },
}

export default status
