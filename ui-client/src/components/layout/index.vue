<template>
  <el-container>
    <el-aside class="aside-main" :class="{asideMainHidden: hiddenStatus}">
      <NavIndex></NavIndex>
    </el-aside>
    <el-container>
      <HiddenButton></HiddenButton>
      <el-main class="main">
        <AppMain></AppMain>
      </el-main>
    </el-container>
    <!-- 登陆框 -->
    <transition name="box-down">
      <Auth v-show="loginDialog"></Auth>
    </transition>
    <transition name="box-down">
      <SettingsInd v-show="settingDialog"></SettingsInd>
    </transition>
  </el-container>

</template>

<script>
  import Auth from "@/views/auth/Auth";
  import AppMain from "@/components/layout/AppMain";
  import NavIndex from "./nav/nav";
  import HiddenButton from "@/components/layout/components/HiddenButton";
  import SettingsInd from "@/views/setting/Settings";

  export default {
    name: "LayoutIndex",
    components: {SettingsInd, AppMain, NavIndex, Auth, HiddenButton},
    data() {
      return {
        loginDialog: false,
        settingDialog: false,
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
      },
      '$store.getters.settingDialog': {
        handler: function (val) {
          this.settingDialog = val
        },
      }
    },
    created() {
    },
  }
</script>

<style lang="scss">


  .aside-main {
    width: 250px !important;
    transition: width 0.2s;
    background-color: var(--aside-background);
  }

  .main {
    background-color: var(--background-main);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .asideMainHidden {
    width: 70px !important;
  }
</style>
