<template>
  <div class="center">
    <div class="login-form">
      <div class="main-form">
        <el-form ref="form" :model="form">
          <div class="input-item">
            <el-input prefix-icon="iconfont icon-zhanghao" v-model="form.userName" placeholder="用户名" clearable></el-input>
          </div>
          <div class="input-item">
            <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password" type="password" placeholder="密码" clearable></el-input>
          </div>
          <!--          <el-row>-->
          <!--            <div class="form-link">-->
          <!--              <span>忘记密码？</span>-->
          <!--            </div>-->
          <!--          </el-row>-->
          <div class="form-submit">
            <div class="form-submit-item">
              <el-button type="success" size="medium" :loading="loading" @click="handleLogin">登陆</el-button>
            </div>
            <div class="form-submit-item">
              <el-button type="info" size="medium" :loading="loading" @click="handleTouristLogin">游客登陆</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <transition name="web-fade">
      <Verify
              ref="verify"
              v-show="stateVerify"
              @success="success"
              :mode="'pop'"
              :captchaType="'blockPuzzle'"
      ></Verify>
    </transition>
  </div>
</template>

<script>
  import Verify from "@/components/verifition/Verify";

  export default {
    name: "LoginComponent",
    components: {Verify},
    data(){
      return {
        form: {
          captcha: {}
        },
        loading: false,
        stateVerify: false,
        rules:{
          userName: [
            { required: true, trigger: "blur", message: "请输入您的账号" }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" }
          ]
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods:{
      success(data){
        this.loading = true;
        this.form.captcha.captchaVerification = data.captchaVerification
        this.doLogin()
      },
      // 登录
      handleLogin(){
        const userName = this.form.userName;
        const password = this.form.password;
        if (userName == null || userName === ''){
          this.$message.warning("请输入帐号")
          return
        }
        if (password == null || password === ''){
          this.$message.warning("请输入登陆密码")
          return
        }
        this.stateVerify = true
        this.$refs.verify.show()
      },
      doLogin(){
        this.$store.dispatch('Login',this.form).then((res) => {
          this.loading = false;
          this.form.captcha = {}
        })
      },
      handleTouristLogin(){
        this.$store.dispatch('TouristLogin').then(() => {
          this.loading = false
          this.form.captcha = {}
        })
      },
      cancel(){
        this.form = {}
      }
    }
  }
</script>

<style scoped>
  .center{
    width: 100%;
    height: 100%;
  }

  .login-form {
    position: relative;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .main-form{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-item{
    display: flex;
    position: relative;
    height: auto;
    padding: 14px 0;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .el-input input:hover {
    opacity: 1;
    display: inline-block;
    border: 0px;
  }
  ::v-deep .el-input__inner{
    height: 42px;
    display: inline-block;
    border: 0px;
    opacity: 1;
  }
  ::v-deep .el-input input:focus {
    display: inline-block;
    border: 0px;
    opacity: 1;
  }
  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
  ::v-deep .el-input__prefix{
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-input__icon{
    font-size: 18px;
    color: #a3a3a3;
    display: block;
    line-height: 38px;
  }

  /* 表单忘记密码 */
  .form-link {
    width: auto;
    text-align: left;
  }
  .form-link span {
    font-size: 14px;
    color: #d0d0d0;
    position: relative;
    left: 25%;
  }
  .form-link span:hover {
    cursor: pointer;
    color: var(--item-border-hover-color);
    transition: 0.3s;
  }

  /* 表单 按钮 */
  .form-submit{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .form-submit-item{
    width: 100%;
    margin: 8px 0;
  }
  ::v-deep .el-form{
    width: 65%;
    margin: 15px 0;
  }
  ::v-deep .el-button{
    width: 100%;
    height: 38px;
    font-size: 14px;
    letter-spacing: 8px;
    border-radius: 20px;
    color: var(--font-color-default);
  }
  ::v-deep .el-button--success{
    background-color: var(--item-border-active-color);
    border-color: var(--item-border-active-color);
  }
  ::v-deep .el-button--success:hover{
    background-color: var(--item-border-hover-color);
    border-color: var(--item-border-hover-color);
  }
  ::v-deep .el-button--info:hover{
    background-color: var(--item-border-default-color);
    border-color: var(--item-border-default-color);
  }
</style>
