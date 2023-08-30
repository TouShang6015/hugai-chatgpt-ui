<template>
  <div class="user-item">
    <div class="img" style="display: flex">
      <el-image lazy :src="imgHeader" fit="fill" v-if="imgHeader">
        <div slot="error" class="image-slot">
          <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="" v-if="$store.getters.sex == null || $store.getters.sex == ''">
          <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="" v-if="$store.getters.sex == '1'">
          <img :src="require('/src/assets/imgs/user_img_default2.png')" alt="" v-if="$store.getters.sex == '0'">
        </div>
      </el-image>
    </div>
    <span class="username" v-show="!hiddenStatus">{{userName || '未登录'}}</span>
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
        userName: '',
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
      this.userName = this.$store.getters.username;
      this.getNoticeData();
    },
    methods: {
      flushImgUrl(){
        let imgHeader = this.$store.state.user.imgHeader;
        if (imgHeader == null && imgHeader != ''){
          this.imgHeader = require('/src/assets/imgs/user_img_default1.png')
        }else{
          this.imgHeader = this.$store.getters.configMain.staticWebsite + imgHeader
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
      getNoticeData(){
        this.$api.get('/module/business/noticeclient/getLastNotice').then(res => {
          if (res.status){
            this.noticeData = res.data;
            this.noticeOpen = true;
          }
        })
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
}

.username{
  color: var(--font-default-color);
  width: 62%;
  margin: 0 5px;
  font-size: 16px;
}
.user-icon{
  color: var(--font-default-color);
}

.img{
  width: 38px;
  height: 38px;
  margin-left: 5px;
  margin-right: 5px;
}
::v-deep .img img{
  width: 95%;
  height: 95%;
  border: 1px solid #c9c7c7;
  border-radius: 25%;
  object-fit: cover;
}
</style>
