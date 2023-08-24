<template>
  <div class="top-header">
    <div class="left-item">
<!--      <div class="logo">-->
<!--        <span class="pointer" @click="goHome">HugAi</span>-->
<!--      </div>-->
    </div>

    <div class="right-item-notice">
      <div class="item">
        <a class="pointer promotion" href="https://github.com/TouShang6015/Hugai-chatgpt" target="_blank">github源码入口</a>
      </div>
      <div class="item">
        <a class="pointer promotion" href="http://chat.doc.equinox19.xyz" target="_blank">参考文档</a>
      </div>
      <div class="item">
        <el-badge is-dot class="item">
          <div style="width: 40px">
            <el-popover
                    :value="noticeOpen"
                    placement="bottom"
                    :title="noticeData.title"
                    width="600"
                    trigger="click"
                    :content="noticeData.content">
              <span slot="reference" class="iconfont icon-xiaoxi pointer"></span>
            </el-popover>

          </div>
        </el-badge>
      </div>
    </div>

    <div class="right-item">
      <div v-if="!isLogin">
        <div class="item">
          <span class="pointer" @click="openLoginDialog">登陆</span>
        </div>
        <div class="item">
          <span class="pointer" @click="openRegisterDialog">注册</span>
        </div>
      </div>
      <div v-if="isLogin">
        <el-dropdown @command="handleCommand" size="medium">
          <!-- 内容 -->
          <div style="display: flex;" class="pointer">
            <div class="item">
              <span @click="goUserHome">{{userName}}</span>
            </div>
            <div class="img" style="display: flex">
              <el-image lazy :src="imgHeader" fit="fill" v-if="imgHeader">
                <div slot="error" class="image-slot">
                  <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="" v-if="$store.getters.sex == null || $store.getters.sex == ''">
                  <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="" v-if="$store.getters.sex == '1'">
                  <img :src="require('/src/assets/imgs/user_img_default2.png')" alt="" v-if="$store.getters.sex == '0'">
                </div>
              </el-image>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userHome">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>

  import {getToken} from "@/utils/auth";

  export default {
    name: "Top",
    data(){
      return {
        isLogin: !!getToken(),
        imgHeader: undefined,
        userName: '',
        noticeData: {},
        noticeOpen: false,
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
      goHome(){
        this.$router.push("/home")
      },
      handleCommand(command) {
        if (command === 'logout'){
          this.$store.dispatch('LogOut');
        }else if (command === 'userHome'){
          this.$router.push("/userHome")
        }
      },
      goUserHome(){
        this.$router.push("/userHome")
      }
    }
  }
</script>

<style scoped>
  @keyframes blink {
    0% { color: #f570b5; }
    50% { color: #c1f8d5; }
    100% { color: #f570b5; }
  }
  @keyframes bigAndSmall {
    0% { font-size: 22px; }
    50% { font-size: 20px; }
    100% { font-size: 22px; }
  }
  .promotion {
    font-size: 15px !important;
    animation: blink 3s infinite;
  }
  .top-header{
    width: 100%;
    height: auto;
    display: flex;
    top: 0;
    justify-content: space-between;
    align-items: center;
  }
  .left-item{
    flex: 1;
    padding: 2px 0px 2px 0px;
  }
  .left-item span{
    font-family: "iconfont logo";
    justify-content: flex-start;
    top: 0;
    left: 0;
    width: auto;
    text-align: center;
    font-weight: 900;
    font-size: 28px;
    letter-spacing: 3px;
    background-image: -webkit-linear-gradient( #0713ee, #91ccff, #e3ffe8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .right-item-notice{
    flex: 1;
    padding: 2px 25px 2px 0px;
    text-align: right;
    align-items: center; /* 垂直方向居中对齐 */
    justify-content: center; /* 水平方向居中对齐 */
  }
  .right-item-notice .item{
    padding: 0 10px;
    display: inline-block;
  }

  .right-item-notice .item .iconfont{
    font-size: 22px;
  }
  .right-item-notice .item .iconfont {
    animation: bigAndSmall 1.5s infinite;
  }
  ::v-deep .el-badge__content.is-fixed{
    top: 10px;
  }
  .right-item{
    width: 15%;
    padding: 2px 25px 2px 0px;
    text-align: right;
    align-items: center; /* 垂直方向居中对齐 */
    justify-content: center; /* 水平方向居中对齐 */
  }
  .right-item .item{
    padding: 0 5px;
    display: inline-block;
  }
  .item span{
    color: #efefef;
    line-height: 40px;
    font-size: 16px;
  }
  .item span:hover{
    color: #ebe6ff;
  }

  /* 个人中心 */
  .img{
    width: 38px;
    height: 38px;
    margin-left: 5px;
    margin-right: 5px;
  }
  ::v-deep .img img{
    width: 95%;
    height: 95%;
    border: 1px solid white;
    border-radius: 50%;
    object-fit: cover;
  }

  ::v-deep .el-dropdown-menu {
    background-color: #272f3e;
    border: 1px solid #596a99;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(43, 15, 15, 0.31);
  }

  ::v-deep .el-dropdown-menu__item {
    color: #39394b;
  }
</style>
