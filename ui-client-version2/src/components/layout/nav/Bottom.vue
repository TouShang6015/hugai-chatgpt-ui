<template>
  <div class="bottom-main" :class="{hiddenStatus:hiddenStatus}">

    <div class="bottom-item pointer bottom-flex-end">
      <el-dropdown @visible-change="visibleChange">
        <UserBottomItem></UserBottomItem>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span class="iconfont icon-guanbi"></span><span class="dropdown-span">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </div>
</template>

<script>
  import UserBottomItem from "@/components/layout/components/UserBottomItem";
  import {getToken} from "@/utils/auth";
  export default {
    name: "Bottom",
    components: {UserBottomItem},
    data() {
      return {
        isLogin: !!getToken(),
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft
      }
    },
    methods:{
      visibleChange(){
        return !this.isLogin;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "/src/assets/css/theme.scss";

  .bottom-main {
    width: 100%;
    display: flex;
    align-self: flex-end;
    height: 15%;
    max-height: 15%;
  }

  .bottom-item {
    width: auto;
    max-height: 50px;
    display: flex;
    margin: 0 2px 0 2px;
  }
  .bottom-item:hover {
    background: $theme-blue-aside-hover-color;
  }

  .bottom-flex-end {
    width: 100%;
    height: 100%;
    display: flex;
    align-self: flex-end;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }


  /* 重写样式 */
  ::v-deep .el-dropdown{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  ::v-deep.el-dropdown-menu {
    background-color: #020202;
    border: 0px;
  }
  ::v-deep .el-dropdown-menu__item span{
    color: $theme-blue-font-default-color;
  }
  ::v-deep .el-dropdown-menu__item .iconfont{
    font-size: 18px;
    padding: 0 10px 0 0;
  }
  ::v-deep .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    background: $theme-blue-aside-hover-color;
  }

</style>
