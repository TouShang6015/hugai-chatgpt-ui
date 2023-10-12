<template>
  <div class="bottom-main" :class="{hiddenStatus:hiddenStatus}">

    <div class="bottom-item pointer bottom-flex-end">
      <el-dropdown trigger="click" @command="handleDropdownSelect">
        <UserBottomItem></UserBottomItem>
        <el-dropdown-menu slot="dropdown">

          <div v-if="!isLogin">
            <el-dropdown-item command="login">
              <span class="iconfont icon-twitch-01"></span><span class="dropdown-span">登陆/注册</span>
            </el-dropdown-item>
          </div>

          <div v-if="isLogin">
            <el-dropdown-item command="account">
              <span class="iconfont icon-security2"></span><span class="dropdown-span">账户管理</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <span class="iconfont icon-a-signin"></span><span class="dropdown-span">退出登录</span>
            </el-dropdown-item>
          </div>

          <el-dropdown-item divided command="setting" v-if="isLogin || !isLogin">
            <span class="iconfont icon-caozuoshezhi"></span><span class="dropdown-span">设置</span>
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
    name: "NavBottom",
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
        this.$store.commit('SET_ACCOUNT_DIALOG',!this.$store.getters.accountDialog)
      }
    }
  }
</script>

<style scoped lang="scss">


  .bottom-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
    background: var(--aside-hover-color);
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
