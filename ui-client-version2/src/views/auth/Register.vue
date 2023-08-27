<template>
  <div class="main">
    <div class="register-form">
      <Top @cancel="cancel"></Top>
      <div class="title">
        <img :src="require('/src/assets/imgs/logo2.png')" alt=""/>
      </div>
      <el-form ref="form" :model="form">
        <el-row>
          <div class="input-item">
            <label>
              <span>用户名</span>
            </label>
            <el-input prefix-icon="iconfont icon-zhanghao" v-model="form.userName" placeholder="请输入用户名"></el-input>
          </div>
        </el-row>
        <el-row>
          <div class="input-item">
            <label>
              <span>邮箱</span>
            </label>
            <el-input prefix-icon="iconfont icon-youxiang " v-model="form.email" placeholder="请输入邮箱"></el-input>
          </div>
        </el-row>
        <el-row>
          <div class="input-item">
            <label>
              <span>验证码</span>
            </label>
            <el-input class="form-mail-input" prefix-icon="iconfont icon-tixinglaba" v-model="form.code" placeholder="请输入邮箱验证码"></el-input>
            <el-button class="form-mail-button" type="primary" @click="handleSendCode" :disabled="emailButtonDisable">{{emailButtonText}}</el-button>
          </div>
        </el-row>
        <el-row>
          <div class="input-item">
            <label>
              <span>密码</span>
            </label>
            <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password" type="password" placeholder="请输入登录密码"></el-input>
          </div>
        </el-row>
        <el-row>
          <div class="input-item">
            <label>
              <span>确认密码</span>
            </label>
            <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password2" type="password" placeholder="请确认登陆密码"></el-input>
          </div>
        </el-row>
        <el-row>
          <div class="form-link">
            <span @click="goLogin">已有账号。去登陆</span>
          </div>
        </el-row>
        <el-row>
          <div class="form-submit">
            <el-button type="success" size="medium" :loading="loading" @click="handleRegister">立即注册</el-button>
          </div>
        </el-row>
      </el-form>

    </div>
  </div>
</template>

<script>
  import Top from './components/top'

  export default {
    name: "Register",
    components: {Top},
    data(){
      return {
        form: {
          captcha: {}
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
      handleRegister(){
        const userName = this.form.userName;
        const password = this.form.password;
        const email = this.form.email;
        const code = this.form.code;
        const password2 = this.form.password2;
        if (userName == null || userName === ''){
          this.$message.warning("请输入帐号")
          return
        }
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
            this.goLogin()
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
      goLogin(){
        this.$store.commit('SET_REGISTER_DIALOG',false)
        this.$store.commit('SET_LOGIN_DIALOG',true)
      },
      cancel(){
        this.form = {}
        this.$store.commit('SET_AUTH_DIALOG',false)
        this.$store.commit('SET_LOGIN_DIALOG',false)
        this.$store.commit('SET_REGISTER_DIALOG',false)
      }
    }
  }
</script>

<style scoped>

  .main {
    width: 900px;
    height: auto;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .register-form {
    background: #3c3c47;
    position: relative;
    width: 100%;
    text-align: center;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
  }

  .title{
    position: relative;
    width: 100%;
    height: 150px;
  }
  .title img{
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translate(-50%, 0%);
    height: auto;
  }

  .input-item{
    display: flex;
    position: relative;
    max-height: 50px;
    padding: 3px 32px;
    justify-content: center;
    align-items: center;
  }
  .input-item label{
    min-width: 8%;
    height: auto;
    display: block;
    text-align: center;
    padding: 0 8px;
  }
  .input-item label span{
    display: block;
    text-align: center;
    line-height: 50px;
    color: white;
  }

  ::v-deep .el-input{
    width: 65%;
    max-height: 35px;
  }
  ::v-deep .el-input__inner{
    max-height: 35px;
  }
  ::v-deep .el-input__prefix{
    display: flex;
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
    color: #ca82ff;
    transition: 0.3s;
  }

  /* 表单 按钮 */
  .form-submit{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    align-items: center;
    padding: 20px 20px 50px 20px;
    /*white-space: nowrap;*/
  }
  ::v-deep .el-button{
    width: 70%;
    font-size: 14px;
    letter-spacing: 8px;
  }
  ::v-deep .el-button--success{
    background-color: #7de244;
    border-color: #7de244;
  }
  ::v-deep .el-button--success:hover{
    background-color: #80f341;
    border-color: #80f341;
  }
  ::v-deep .el-button--primary{
    background-color: #4097ff;
    border-color: #4097ff;
  }
  ::v-deep .el-button--primary:hover{
    background-color: #2186ff;
    border-color: #2186ff;
  }

  ::v-deep .form-mail-input.el-input{
    width: 48%;
  }
  ::v-deep .form-mail-button.el-button{
    width: 15%;
    letter-spacing: 2px;
    font-size: 14px;
    padding: 6px 6px;
    height: 35px;
    margin-left: 15px;
  }

</style>
