import { Message } from 'element-ui'
import store from "@/store";

const userSocket = {
  state: {
    socket: undefined,
    socketId: undefined,
    // 在线人数
    onlineCount: 0,
  },

  mutations: {
    SET_SOCKET: (state, data) => {
      state.socket = data
    },
    SET_SOCKET_ID: (state, data) => {
      state.socketId = data
    },
    SET_ONLINE_COUNT: (state, data) => {
      state.onlineCount = data
    },
  },

  actions: {
    // 用户socket连接
    ConnectUserSocket({ commit, state }) {
      const userId = store.getters.userId;
      if (userId != null){
        return new Promise((resolve, reject) => {

          const websocketUrl = store.getters.resourceMain.websocketUrl;
          const wsUrl = websocketUrl +'/socket/user/' + userId;
          const webSocket = new WebSocket(wsUrl);

          webSocket.onmessage = function (event) {
            let data = event.data;
            handleSocketData(data)
          };

          webSocket.onclose = function () {
          }
          webSocket.onerror = function () {
          }

          commit('SET_SOCKET',webSocket);
          resolve("")
        })
      }
    },

    // 清除连接信息
    ClearSocketInfo({ commit, state }){
      return new Promise((resolve, reject) => {
        commit('SET_SOCKET',undefined);
        commit('SET_SOCKET_ID',undefined);
        resolve("")
      })
    }

  }

}

/**
 * socket 消息处理
 * @param val
 */
function handleSocketData(val) {
  if (val == null || val === ''){
    return
  }
  const data = JSON.parse(val);

  // 弹窗推送
  const code = data.code;
  const resData = data.data;
  switch (code) {

    // 初始化
    case 0:
      store.commit('SET_SOCKET_ID',resData);
      break;

    // 通知
    case 2:
      Message({message: data.message, type: 'success'})
      break;
    case 3:
      Message({message: data.message, type: 'warning'})
      break;
    case 4:
      Message({message: data.message, type: 'error'})
      break;

    // 在线人数
    case 11:
      store.commit('SET_ONLINE_COUNT',resData);
      break;
  }

}

export default userSocket
