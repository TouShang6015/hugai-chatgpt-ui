<template>
  <div class="user-item">
    <div class="img" style="display: flex">
      <img :src="imgHeader" v-if="!imgError" @error="imgError = true"/>
      <img :src="require('/src/assets/imgs/user_img_default1.png')" v-if="imgError"/>
    </div>
    <span class="username" v-show="!hiddenStatus">{{nickName || '未登录'}}</span>
    <span class="iconfont icon-zhanghao user-icon" v-show="!hiddenStatus"></span>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";

  export default {
    name: "UserBottomItem",
    data(){
      return{
        isLogin: !!getToken(),
        imgHeader: undefined,
        imgError: false,
        nickName: '',
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
      }
    },
    watch:{
      '$store.state.settings.hiddenStatusLeft':{
        handler: function(val) {
          this.hiddenStatus = val
        },
      }
    },
    mounted() {
      this.flushImgUrl();
      this.nickName = (this.$store.state.user.userDetail || {}).nickName;
    },
    methods: {
      flushImgUrl(){
        let imgHeader = this.$store.state.user.imgHeader;
        if (imgHeader == null && imgHeader != ''){
          this.imgHeader = require('/src/assets/imgs/user_img_default1.png')
        }else{
          this.imgHeader = this.$store.getters.resourceMain.staticWebsite + imgHeader
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
      },
      handleCommand(command) {
        if (command === 'logout'){
          this.$store.dispatch('LogOut');
        }else if (command === 'userHome'){
          this.$router.push("/userHome")
        }
      }
    }
  }
</script>

<style scoped lang="scss">

.user-item{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.username{
  color: var(--font-color-default);
  width: 62%;
  margin: 0 5px;
  font-size: 16px;
}
.user-icon{
  color: var(--font-color-default);
}

.img{
  width: 38px;
  height: 38px;
  margin-left: 5px;
  margin-right: 5px;
}
::v-deep .img .el-image{
  width: 100%;
  height: 100%;
}
::v-deep .img img{
  width: 95%;
  height: 95%;
  border: 1px solid #c9c7c7;
  border-radius: 25%;
  object-fit: cover;
}
</style>
