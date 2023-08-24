<template>
  <el-container>
    <el-aside class="aside-main" :class="{asideMainHidden: hiddenStatus}">
      <NavIndex></NavIndex>
    </el-aside>
    <el-container>
      <HiddenButton></HiddenButton>
<!--      <el-header height="48px">-->
<!--        <Top></Top>-->
<!--      </el-header>-->
      <el-main class="main">
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
  import NavIndex from "./nav/nav";
  import Top from "./top/index";
  import HiddenButton from "@/components/layout/components/HiddenButton";

  export default {
    name: "LayoutIndex",
    components: {AppMain, NavIndex, Top, Auth, HiddenButton},
    data() {
      return {
        loginDialog: false,
        registerDialog: false,
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
      }
    },
    watch: {
      '$store.getters.authDialog': {
        handler: function (val) {
          this.loginDialog = val
        },
      },
      '$store.state.settings.hiddenStatusLeft': {
        handler: function (val) {
          this.hiddenStatus = val
        },
      }
    },
    created() {
    },
  }
</script>

<style lang="scss">
  @import "/src/assets/css/theme.scss";

  .aside-main {
    width: 250px !important;
    transition: width 0.2s;
    background-color: $theme-blue-aside-color;
  }

  .main {
    background-color: $theme-blue-main-color;
  }

  .asideMainHidden {
    width: 70px !important;
  }
</style>
