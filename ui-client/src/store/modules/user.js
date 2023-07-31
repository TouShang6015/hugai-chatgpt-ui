import api from '/src/utils/request/BaseRequest'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { encrypt } from '@/utils/rsaEncrypt';

const user = {
  state: {
    token: getToken(),
    username: '',
    imgHeader: '',
    sex: '',
    ifTourist: '',
    deskImgUrl: '',
    userId: '',
    userDetail: {}
  },

  mutations: {
    SET_USER_ID: (state, data) => {
      state.userId = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_IMG_HEADER: (state, imgHeader) => {
      state.imgHeader = imgHeader
    },
    SET_USER_DETAIL: (state, userDetail) => {
      state.userDetail = userDetail
    },
    SET_SEX: (state, data) => {
      state.sex = data
    },
    SET_IF_TOURIST: (state, data) => {
      state.ifTourist = data
    },
    SET_DESK_IMG_URL: (state, data) => {
      state.deskImgUrl = data
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const userName = userInfo.userName.trim()
      const password = encrypt(userInfo.password)
      return new Promise((resolve, reject) => {
        const param = {
          userName, password
        }
        api.post('/module/user/userinfo/login',param).then(res => {
          if (res.status){
            setToken(res.data)
            commit('SET_TOKEN', res.data)
            Message({message: '登陆成功', type: 'success'})
            commit('SET_LOGIN_DIALOG',false)
            commit('SET_REGISTER_DIALOG',false)
            setTimeout(() => {
              window.location.href = "/"
            },500)
          }else{
            Message({message: res.message, type: 'error'})
          }
          resolve()
        })
      })
    },

    // 游客登陆
    TouristLogin({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('/module/user/userinfo/touristLogin').then(res => {
          if (res.status){
            setToken(res.data)
            commit('SET_TOKEN', res.data)
            Message({message: '登陆成功', type: 'success'})
            commit('SET_LOGIN_DIALOG',false)
            commit('SET_REGISTER_DIALOG',false)
            setTimeout(() => {
              window.location.href = "/"
            },500)
          }else{
            Message({message: res.message, type: 'error'})
          }
          resolve()
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.post('/auth/system/logout').then((res) => {
          if (res.status){
            commit('SET_TOKEN', '')
            removeToken()
            Message({message: '退出成功', type: 'success'})
            setTimeout(() => window.location.href = "/",500)
          }else{
            Message({message: res.message, type: 'error'})
          }
          resolve()
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.get('/module/user/userinfo/getInfo').then(res => {
          if (res.status){
            let data = res.data;
            commit('SET_USER_DETAIL', data)
            commit('SET_USERNAME', data.userName || data.ipaddress)
            commit('SET_USER_ID', data.id)
            commit('SET_IMG_HEADER', data.imgUrl)
            commit('SET_SEX', data.sex)
            commit('SET_IF_TOURIST', data.ifTourist)
            commit('SET_DESK_IMG_URL', data.deskImgUrl)
            commit('SET_LOADING_STATE_USER_INFO',true)
          }else{
            Message({message: res.message, type: 'error'})
          }
          resolve(res)
        })

      })
    },

  }
}

export default user
