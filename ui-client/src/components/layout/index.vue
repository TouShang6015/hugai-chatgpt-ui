<template>
  <el-container>
    <el-aside class="aside-main" :class="{asideMainHidden: hiddenStatus}">
      <NavIndex></NavIndex>
      <HiddenButton></HiddenButton>
    </el-aside>
    <el-main class="main">
      <AppMain></AppMain>
    </el-main>

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
  import HiddenButton from "@/components/layout/components/HiddenButton";

  export default {
    name: "LayoutIndex",
    components: {AppMain, NavIndex, Auth, HiddenButton},
    data() {
      return {
        loginDialog: false,
        settingDialog: false,
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
      },
    },
    created() {
    },
  }
</script>

<style lang="scss">

  .aside-main {
    position: relative;
    flex: 0 0 12%;
    transition: flex-basis 0.2s;
    background-color: var(--aside-background);
    border-right: 1px var(--col-border-color) solid;
    border-top: 1px var(--col-border-color) solid;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .main {
    flex: 1;
    background-color: var(--background-main);
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .asideMainHidden {
    flex: 0 0 3.5%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
