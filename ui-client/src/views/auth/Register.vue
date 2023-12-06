<template>
  <div class="center">
    <div class="login-form">
      <div class="main-form">
        <el-form ref="form" :model="form">
          <div class="input-item">
            <el-input prefix-icon="iconfont icon-youxiang " v-model="form.email" placeholder="请输入邮箱"></el-input>
          </div>
          <div class="input-item">
            <el-input class="form-mail-input" prefix-icon="iconfont icon-tixinglaba" v-model="form.code" placeholder="请输入邮箱验证码"></el-input>
            <el-button class="form-mail-button" type="primary" @click="handleSendCode" :disabled="emailButtonDisable">{{emailButtonText}}</el-button>
          </div>
          <div class="input-item">
            <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password" type="password" placeholder="登录密码" clearable></el-input>
          </div>
          <div class="input-item">
            <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password2" type="password" placeholder="请确认登陆密码"></el-input>
          </div>
          <div class="form-submit">
            <div class="form-submit-item">
              <el-button type="success" size="medium" :loading="loading" @click="handleRegister">立即注册</el-button>
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
  import Cache from '@/utils/cache'
  import Verify from "@/components/verifition/Verify";

  export default {
    name: "LoginComponent",
    components: {Verify},
    data(){
      return {
        form: {
          captcha: {},
          promoCode: Cache.local.get('inviteCode')
        },
        loading: false,
        stateVerify: false,
        emailButtonText: '发送验证码',
        emailButtonDisable: false,
        timer: undefined,
        countDown: 0,
      }
    },
    created() {
    },
    mounted() {
    },
    methods:{
      success(data){

      },
      handleRegister(){
        const password = this.form.password;
        const email = this.form.email;
        const code = this.form.code;
        const password2 = this.form.password2;
        if (password == null || password === ''){
          this.$message.warning("请输入登陆密码")
          return
        }
        if (email == null || email === ''){
          this.$message.warning("请输入邮箱")
          return
        }
        if (code == null || code === ''){
          this.$message.warning("验证码不能为空")
          return
        }
        if (password2 == null || password2 === ''){
          this.$message.warning("确认登陆密码不能为空")
          return
        }
        // 注册请求
        this.$api.post('/module/user/userinfo/register',this.form).then(res => {
          if (res.status){
            this.$message.success("注册成功，欢迎加入HugAi~~~")
            this.$emit('changeSelect','1')
          }else{
            this.$message.error(res.message)
          }
        })
      },
      handleSendCode(){
        const email = this.form.email;
        if (email == null || email === ''){
          this.$message.warning('邮箱号不能为空')
          return
        }
        this.emailButtonDisable = true
        this.$api.get('/module/user/userinfo/registerSendMail',{email: email}).then(res => {
          this.startTimer()
          if (res.status){
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      },
      initTimer(){
        this.emailButtonDisable = true
        this.countDown = 60
      },
      endTimer(){
        this.emailButtonDisable = false
        this.countDown = 0
        clearInterval(this.timer)
        this.timer = null
      },
      startTimer(){
        this.initTimer()
        if (this.timer === undefined || this.timer == null){
          this.timer = setInterval(() => {
            if (this.countDown < 0){
              this.endTimer()
              this.emailButtonText = '发送验证码'
            }else{
              this.countDown--
              this.emailButtonText = '重新发送(' + this.countDown + ')'
            }
          },1000)
        }
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
    background: var(--background-main);
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

  ::v-deep .form-mail-button.el-button{
    width: 30%;
    letter-spacing: 2px;
    font-size: 14px;
    padding: 6px 6px;
    /*height: 35px;*/
    margin-left: 15px;
  }
</style>
