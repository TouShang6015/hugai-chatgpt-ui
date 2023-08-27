<template>
  <div class="bottom-main" :class="{hiddenStatus:hiddenStatus}">

    <div class="bottom-item pointer bottom-flex-end">
      <el-dropdown trigger="click" @command="handleDropdownSelect">
        <UserBottomItem></UserBottomItem>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout" v-if="isLogin">
            <span class="iconfont icon-a-signin"></span><span class="dropdown-span">退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item command="login" v-if="!isLogin">
            <span class="iconfont icon-twitch-01"></span><span class="dropdown-span">登陆</span>
          </el-dropdown-item>
          <el-dropdown-item command="register" v-if="!isLogin">
            <span class="iconfont icon-a-addtoperson"></span><span class="dropdown-span">注册用户</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </div>
</template>

<script>
  import UserBottomItem from "@/components/layout/components/UserBottomItem";
  import {getToken} from "@/utils/auth";
  export default {
    name: "Bottom",
    components: {UserBottomItem},
    data() {
      return {
        isLogin: !!getToken(),
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft
      }
    },
    methods:{
      handleDropdownSelect(command) {
        switch (command) {
          case 'logout':
            this.$store.dispatch('LogOut');
            break;
          case 'login':
            this.openLoginDialog()
            break;
          case 'register':
            this.openRegisterDialog()
            break;
        }
      },
      openLoginDialog(){
        this.$store.commit('SET_AUTH_DIALOG',!this.$store.getters.authDialog)
        this.$store.commit('SET_LOGIN_DIALOG',!this.$store.getters.loginDialog)
        this.$store.commit('SET_REGISTER_DIALOG',false)
      },
      openRegisterDialog(){
        this.$store.commit('SET_AUTH_DIALOG',!this.$store.getters.authDialog)
        this.$store.commit('SET_REGISTER_DIALOG',!this.$store.getters.registerDialog)
        this.$store.commit('SET_LOGIN_DIALOG',false)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "/src/assets/css/theme.scss";

  .bottom-main {
    width: 100%;
    display: flex;
    align-self: flex-end;
    height: 15%;
    max-height: 15%;
    margin-bottom: 5px;
  }

  .bottom-item {
    width: auto;
    max-height: 50px;
    display: flex;
    margin: 0 5px 0 5px;
    border-radius: 10px;
  }
  .bottom-item:hover {
    background: $theme-blue-aside-hover-color;
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


  /* 重写样式 */
  ::v-deep .el-dropdown{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

</style>
