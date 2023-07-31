<template>
  <el-container>
    <el-aside width="65px">
      <Nav></Nav>
    </el-aside>
    <el-container>
      <el-header height="48px">
        <Top></Top>
      </el-header>
      <el-main>
        <AppMain></AppMain>
      </el-main>
    </el-container>
    <!-- 登陆框 -->
    <transition name="box-down">
      <Auth v-show="loginDialog"></Auth>
    </transition>
  </el-container>

</template>

<script>
  import Auth from "@/views/auth/Auth";
  import AppMain from "@/components/layout/AppMain";
  import Nav from "./nav/nav";
  import Top from "./top/index";
  export default {
    name: "LayoutIndex",
    components: {AppMain,Nav,Top,Auth},
    data(){
      return{
        loginDialog: false,
        registerDialog: false,
      }
    },
    watch:{
      '$store.getters.authDialog': {
        handler: function(val) {
          this.loginDialog = val
        },
      }
    }
  }
</script>

<style>

</style>
