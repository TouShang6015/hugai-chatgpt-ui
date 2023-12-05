<template>
  <div class="main" v-if="isLogin">
    <div class="col-left">
      <div class="col-header">
        <div class="col-item-center">
          <h1>用户中心</h1>
        </div>
        <div class="col-item-center">
          <button class="btn unBorder color-red" @click="logout">退出登录</button>
        </div>
      </div>
      <user-info-left></user-info-left>
    </div>
    <div class="col-right">
      <div class="col-header">
        <div class="description" >
          <h4>个人中心</h4>
        </div>
      </div>
      <user-info-right></user-info-right>
    </div>
  </div>
</template>

<script>
  import UserInfoLeft from "@/views/pages/user/userHome/components/UserInfoLeft";
  import {getToken} from "@/utils/auth";
  import UserInfoRight from "@/views/pages/user/userHome/components/UserInfoRight";
  export default {
    name: "UserInfo",
    components: {UserInfoRight, UserInfoLeft},
    data(){
      return{
        isLogin: !!getToken(),
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('LogOut')
      }
    }
  }
</script>

<style scoped lang="scss">
.main{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: auto;
  background: var(--help-background);
}

  .col-left{
    width: 24%;
    height: 100%;
    border-right: 1px solid var(--col-border-color);
    overflow: auto;
  }
.col-right{
  width: 76%;
  height: 100%;
  overflow: auto;
}
.col-item-center{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .col-header{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    h1{
      color: var(--font-color-default);
      font-weight: 200;
      font-size: 26px;
    }
    .description{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      h4{
        width: 80%;
        margin-left: 30px;
        padding-bottom: 15px;
        padding-left: 30px;
        border-bottom: 1px var(--col-border-color) solid;
        /*font-weight: 100;*/
        color: var(--font-color-default);
        font-size: 14px;
      }
    }
  }
</style>
