<template>
  <div id="app" class="w-screen h-screen">
    <transition name="web-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{

      }
    },
    created() {
      // 获取主题
      this.$store.commit('GET_THEME')
      this.updateSocketConnectInfo();
    },
    deactivated() {
      // 清理socket连接
      const socketId = this.$store.state.userSocket.socketId;
      this.$api.get('/module/user/connect/closeSocket/' + socketId);
    },
    methods:{
      // 更新socket连接信息
      updateSocketConnectInfo(){
        let that = this;
        setInterval(() => {
          const userId = that.$store.getters.userId;
          let socketId = that.$store.state.userSocket.socketId;
          let socket = that.$store.state.userSocket.socket;
          if (socketId != null){
            that.$api.get('/module/user/connect/verify/' + socketId).then(res => {
              if (!res.status){
                that.$notify.info('网络不稳定，正在重新连接')
                that.$store.dispatch('ClearSocketInfo')
                this.$api.get('/module/user/connect/closeSocket/' + socketId);
                if (userId != null){
                  that.$store.dispatch('ConnectUserSocket')
                }
              }else{
                if (socket != null){
                  socket.send(JSON.stringify({code: 101}))
                }
              }
            })
          }
        },60000)
      }
    }
  }
</script>

<style>
  @import url(./assets/font/iconfont.css);

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-size: cover;
    position: fixed;
  }

</style>
