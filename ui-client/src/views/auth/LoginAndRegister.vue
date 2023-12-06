<template>
  <div class="login-register-main rounded-md" @click.stop>
    <DialogTopClose/>
    <div class="head-select">
      <a-tabs :value="tabsValue" :width="'70%'" :tab-item="[
        { value: '1', label: '账号登录'},
        { value: '2', label: '注册'},
      ]" theme="noBorder" @change="tabsChange"></a-tabs>
    </div>
    <div class="content">
      <transition-group name="flip">
        <LoginComponent v-show="tabsValue === '1'" key="login" @changeSelect="tabsChange"></LoginComponent>
        <RegisterComponent v-show="tabsValue === '2'" key="register" @changeSelect="tabsChange"></RegisterComponent>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import LoginComponent from "@/views/auth/Login";
  import RegisterComponent from "@/views/auth/Register";
  export default {
    name: "LoginAndRegister",
    components: {RegisterComponent, LoginComponent},
    props:{
      tabsValueProps: { type: String, default: '1' }
    },
    data(){
      return{
        tabsValue: this.tabsValueProps
      }
    },
    mounted() {
    },
    methods:{
      tabsChange(val){
        this.tabsValue = val
      }
    }
  }
</script>

<style scoped>
  .login-register-main{
    width: 500px;
    height: auto;
    background: var(--dialog-background);
    border: 1px var(--item-border-normal-color) solid;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
    z-index: 10001;
  }

  .head-select{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content{
    min-height: 500px;
    position: relative;
    transition: transform 0.3s;
  }

  .flip-enter-active,
  .flip-leave-active {
    transition: transform 0.3s;
    position: absolute;
  }

  .flip-enter {
    transform: rotateX(90deg);
    z-index: 1;
  }

  .flip-leave-to {
    transform: rotateY(90deg);
    z-index: -1;
  }
</style>
