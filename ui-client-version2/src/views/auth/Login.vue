<template>
  <div class="center">
    <div class="main">
      <div class="login-form">
        <DialogTopClose @cancel="cancel"></DialogTopClose>
        <div class="title">
          <img :src="require('/src/assets/imgs/logo2.png')" alt=""/>
        </div>
        <el-form ref="form" :model="form">
          <el-row>
            <div class="input-item">
              <label>
                <span>账号</span>
              </label>
              <el-input prefix-icon="iconfont icon-zhanghao" v-model="form.userName" placeholder="请输入用户名/邮箱"></el-input>
            </div>
          </el-row>
          <el-row>
            <div class="input-item">
              <label>
                <span>密码</span>
              </label>
              <el-input prefix-icon="iconfont icon-yincangmima" v-model="form.password" type="password" placeholder="请输入登陆密码"></el-input>
            </div>
          </el-row>
          <el-row>
            <div class="form-link">
              <span>忘记密码？</span>
            </div>
          </el-row>
          <el-row>
            <div class="form-submit">
              <el-button type="success" size="medium" :loading="loading" @click="handleLogin">登陆</el-button>
              <el-button type="info" size="medium" :loading="loading" @click="handleTouristLogin">游客登陆</el-button>
              <div></div>
              <el-button type="primary" size="medium" style="width:71%;margin: 10px 0;" @click="goRegister" :loading="loading">加入HugAi（立即注册）</el-button>
            </div>
          </el-row>
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
    name: "AutoLogin",
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
      goRegister(){
        this.$store.commit('SET_LOGIN_DIALOG',false)
        this.$store.commit('SET_REGISTER_DIALOG',true)
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

  .main {
    width: 900px;
    height: auto;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-form {
    background: var(--dialog-background);
    box-shadow: 5px 2px 0px 3px var(--aside-color);
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
    width: 35%;
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

</style>
