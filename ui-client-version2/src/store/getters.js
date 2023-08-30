const getters = {
  userId: state => state.user.userId,
  token: state => state.user.token,
  username: state => state.user.username,
  imgHeader: state => state.user.imgHeader,
  userDeskImgUrl: state => state.user.deskImgUrl,
  ifTourist: state => state.user.ifTourist,
  sex: state => state.user.sex,
  authDialog: state => state.status.authDialog,
  loginDialog: state => state.status.loginDialog,
  registerDialog: state => state.status.registerDialog,
  loadingStateConfig: state => state.status.loadingStateConfig,
  loadingStateUserInfo: state => state.status.loadingStateUserInfo,
  accountDialog: state => state.status.accountDialog,
  configMain: state => state.webConfig.configMain,
  streamResponseType: state => state.webConfig.configMain.streamResponseType,
}
export default getters
