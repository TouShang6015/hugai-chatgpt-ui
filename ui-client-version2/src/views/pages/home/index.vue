<template>
  <div class="home">
    <div class="top-tabs">
      <a-tabs :value="tabsSelect" :tab-item="tabItem" theme="normal" @change="handleTabsChange"></a-tabs>
    </div>
    <div class="content">
      <HomeComponentsChat v-if="tabsSelect === '1'"></HomeComponentsChat>
    </div>
    <el-tooltip content="常见问题/帮助" placement="top" v-model="tipsStatus">
      <div class="right-bottom-help click-box" @click="goHelp">
        <span class="iconfont icon-guanyu pointer"></span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  import HomeComponentsChat from "@/views/pages/home/components/HomeComponentsChat";

  export default {
    name: "HomeIndex",
    components: {HomeComponentsChat},
    data() {
      return {
        tabsSelect: undefined,
        tipsStatus: true,
        tabItem: [
          {value: '1', label: "问答", route: ''},
          {value: '2', label: "热门场景", route: ''},
          {value: '3', label: "创作", route: ''},
        ]
      }
    },
    created() {
      this.tabsSelect = '1'
    },
    methods: {
      handleTabsChange(val){
        this.tabsSelect = val;
      },
      goHelp(){
        this.$router.push("/other/help")
      }
    }
  }
</script>

<style scoped lang="scss">
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: flex-start;
    flex-direction: column;
  }
  .top-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
  .content{
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .right-bottom-help{
    position: absolute;
    right: 2%;
    bottom: 2%;
  }
  ::v-deep .right-bottom-help .iconfont{
    font-size: 38px;
    color: var(--font-color-default);

  }
</style>
