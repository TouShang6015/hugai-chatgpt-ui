<template>
  <div class="bottom-main" :class="{hiddenStatus:hiddenStatus}">

    <div class="bottom-item disable bottom-flex-end onlineCount">
      <span v-if="!hiddenStatus">🟢 {{onlineCount}}人在线</span>
      <span v-else>🟢 {{onlineCount}}人</span>
    </div>
    <div class="bottom-item pointer bottom-flex-end rounded-md" @click="openAccountDialog">
      <UserBottomItem></UserBottomItem>
    </div>

  </div>
</template>

<script>
  import UserBottomItem from "@/components/layout/components/UserBottomItem";
  import {getToken} from "@/utils/auth";
  export default {
    name: "NavBottom",
    components: {UserBottomItem},
    data() {
      return {
        isLogin: !!getToken(),
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
        onlineCount: 1
      }
    },
    watch:{
      '$store.state.userSocket.onlineCount': {
        handler: function (val) {
          this.onlineCount = val
        },
      },
      '$store.state.settings.hiddenStatusLeft':{
        handler: function(val) {
          this.hiddenStatus = val
        },
      }
    },
    created() {
      // 获取在线人数
      this.getOnlineCount()
    },
    methods:{
      getOnlineCount(){
        this.$api.get("/module/user/connect/getOnlineCount").then(res => {
          this.onlineCount = res.data;
        })
      },
      handleDropdownSelect(command) {
        switch (command) {
          case 'logout':
            this.$store.dispatch('LogOut');
            break;
          case 'login':
            this.openLoginDialog()
            break;
          case 'setting':
            this.openSettingDialog()
            break;
          case 'account':
            this.openAccountDialog()
            break;
        }
      },
      openLoginDialog(){
        this.$store.commit('SET_AUTH_DIALOG',!this.$store.getters.authDialog)
      },
      openSettingDialog(){
        this.$store.commit('SET_SETTING_DIALOG',!this.$store.getters.settingDialog)
      },
      openAccountDialog(){
        if (this.isLogin){
          this.$router.push("/UserHome")
        }else{
          this.openLoginDialog()
        }
      }
    },
  }
</script>

<style scoped lang="scss">


  .bottom-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: flex-end;
    height: 12%;
    margin-bottom: 5px;
  }

  .bottom-item {
    width: auto;
    height: 50px;
    display: flex;
    margin: 0 5px 0 5px;
  }
  .bottom-item:hover {
    background: var(--aside-hover-color);
  }
  .bottom-item.disable:hover {
    background: rgba(255, 255, 255, 0.0);
  }

  .bottom-flex-end {
    width: 100%;
    height: 100%;
    display: flex;
    align-self: flex-end;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .onlineCount{
    color: #d8fadb;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /* 重写样式 */
  ::v-deep .el-dropdown{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

</style>
